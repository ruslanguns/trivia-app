import React, { useState, useEffect } from 'react'
import { Beforeunload } from 'react-beforeunload';
import useFecth from '../hooks/useFecth'
import { generateTrivia } from '../selectors/generateTrivia'
import shuffleArray from '../helpers/shuffleArray';
import { CountDown } from '../components/CountDown';

export const Trivia = ({ location, history }) => {

  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questions, setQuestions] = useState([])
  const [shouldFetchTrivia, setShouldFetchTrivia] = useState(false)
  const [triviaData, setTriviaData] = useState([])
  const [metadata, setMetadata] = useState({})
  const fetchTrivia = useFecth({
    fecthRequest: generateTrivia,
    shouldExecute: shouldFetchTrivia,
    props: metadata
  })

  useEffect(() => {
    if (fetchTrivia.result) {
      if (fetchTrivia.result.length !== 5) {
        return history.push({
          pathname: '/reset',
        })
      }
      setTriviaData(fetchTrivia.result)
      setSelectedQuestion(fetchTrivia.result[counter])
      localStorage.setItem('trivia_data', JSON.stringify(fetchTrivia.result))
      setLoading(false)
    }
  }, [fetchTrivia.result, counter, history])

  useEffect(() => {
    if (!location.state) {
      history.push('/')
    } else {
      setMetadata(location.state)
      setShouldFetchTrivia(true)
    }
  }, [location, history])
  if (!!shouldFetchTrivia && !fetchTrivia.executing) setShouldFetchTrivia(false)

  useEffect(() => {
    if (triviaData) setSelectedQuestion(triviaData[counter])
  }, [triviaData, counter])

  useEffect(() => {
    if (selectedQuestion) {
      const array = [selectedQuestion.correct_answer, ...selectedQuestion.incorrect_answers]
      setQuestions(shuffleArray(array))
    }
  }, [selectedQuestion])


  const handleOnClick = (item) => {
    if (item === selectedQuestion.correct_answer) setCorrectAnswers(correctAnswers + 1)
    if (counter < 4) setCounter(counter + 1)
    else {
      // Trivia terminada!
      history.push({
        pathname: '/results',
        state: {
          correctAnswers,
          timeOut: false
        }
      })
      localStorage.removeItem('trivia_data')
      setCounter(0)
    }
  }

  const handleCoundownCallback = () => {
    if (counter < 4) setCounter(counter+1)
    else {
      history.push({
        pathname: '/results',
        state: {
          correctAnswers,
          timeOut: true
        }
      })
    }
  }

  return (

    <Beforeunload onBeforeunload={() => 'Si cierras perderas tu avance'}>
      <div className="content">
        {
          loading && <div>
            <h1>Loading...</h1>
          </div>
        }
        {
          !loading && selectedQuestion &&
          <>
            <div className="content__subtitle">
              <h1>Pregunta {counter + 1} / 5</h1>
              <span>Dificultad: <b>{selectedQuestion?.difficulty.toUpperCase()}</b></span>
              <span>Categoría: <b>{selectedQuestion?.category.toUpperCase()}</b></span>
              <span>Tiempo restante: <b><CountDown startValue={10} callback={handleCoundownCallback}/></b></span>
            </div>

            <form>
              <div className="trivia">
                <div className="trivia__question">
                  <h3 dangerouslySetInnerHTML={{ __html: selectedQuestion.question }} />
                </div>
                <div className="trivia__answers">
                  {
                    questions &&
                    questions.map((item, i) => {
                      return <div key={item}>
                        <button
                          type="button"
                          className="button success"
                          onClick={(e) => {
                            e.preventDefault()
                            handleOnClick(item)
                          }}
                          style={{
                            margin: 6,
                            fontWeight: 400
                          }}>
                          <span dangerouslySetInnerHTML={{ __html: item }}></span>
                        </button>
                      </div>
                    })}

                </div>
              </div>
            </form>
          </>
        }
      </div>

    </Beforeunload>
  )
}
