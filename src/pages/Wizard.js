import React, { useState, useEffect } from 'react'
import { interval } from 'rxjs'
import { take } from 'rxjs/operators'
import { useForm } from 'react-hook-form';
import useFecth from '../hooks/useFecth'
import { requestTriviaToken } from '../selectors/requestTriviaToken'
import { getTriviaCategories } from '../selectors/getTriviaCategories'

const countDownPhrases = [
  '¿estás preparado?',
  'comenzamos en 3',
  'comenzamos en 2',
  'comenzamos en 1',
  'VAMOS!'
]

export const Wizard = ({ history }) => {

  const { register, handleSubmit, errors } = useForm();
  const [countDown, setCountDown] = useState('Iniciar trivia')
  const [submitted, setSubmitted] = useState(false)
  const [shouldFetchToken, setShouldFetchToken] = useState(false)
  const [shouldFetchCategories, setShouldFetchCategories] = useState(false)
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState(localStorage.getItem('trivia_token'))

  const fetchToken = useFecth({
    fecthRequest: requestTriviaToken,
    shouldExecute: shouldFetchToken
  });
  const fetchCategories = useFecth({
    fecthRequest: getTriviaCategories,
    shouldExecute: shouldFetchCategories
  })

  const { result: tokenResult } = fetchToken
  const { result: categoriesResult } = fetchCategories
 
  useEffect(() => {
    if (!categoriesResult) setShouldFetchCategories(true)
    else setCategories(categoriesResult)
  }, [categoriesResult])

  useEffect(() => {
    if (tokenResult) {
      setToken(tokenResult?.token)
      localStorage.setItem('trivia_token', tokenResult?.token)
    }
  }, [tokenResult])
  
  useEffect(() => {
    if (!token) setShouldFetchToken(true)
  }, [token])

  if(!!shouldFetchToken && !fetchToken.executing) setShouldFetchToken(false)
  if(!!shouldFetchCategories && !fetchCategories.executing) setShouldFetchCategories(false)

  const onSubmit = data => {
    setSubmitted(true)
    const time = countDownPhrases.length
    const interval$ = interval(1000).pipe(take(time))

    interval$.subscribe(async val => {
      setCountDown(countDownPhrases[val])
      if(countDownPhrases[val] === countDownPhrases.slice(-1)[0]) {
        history.push({
          pathname: '/trivia',
          state: {
            token,
            ...data
          }
        })
      }
    })
  }  
  
  // TODO: Contar las categorías /api_count.php?category={ID}
  // * Porque si no hay, habrá que dar la opción de reiniciar la sesión.
  // TODO: Controlar si hay menos de 5 preguntas no lanzar la TRIVIA.

  return (
    <div className="content">
      <div className="content__subtitle">
        <h1>Pon a prueba tu conocimiento</h1>
      </div>

      <div className="wizard">
        <div className="wizard__header">
          <h2>Configurar trivia</h2>
        </div>
        <div className="wizard__body">
          <form
            className="wizard__form"
            onSubmit={handleSubmit(onSubmit)}>

            <div className="wizard__form-field">
              <select
                ref={register({required: true})}
                name="category"
                defaultValue=""
                className="wizard__form-select"
                type="text">
                <option value="" disabled>Elige una categoría</option>
                { // TODO: Fusionar Fetch Categories vs Availabled Questions
                  categories &&
                    categories.map(({id, name}) => 
                      <option
                        key={id}
                        value={id}>
                          {name}
                      </option>
                    )
                }
              </select>
              {
                errors.category && <small className="wizard__input-error">Debe seleccionar una categoria</small>
              }
            </div>

            <div className="wizard__form-field">
              <select
                ref={register({required: true})}
                name="difficulty"
                defaultValue=""
                className="wizard__form-select"
                type="text">
                <option value="" disabled>Elige la dificultad</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {
                errors.difficulty && <small className="wizard__input-error">Debe seleccionar una dificultad</small>
              }
            </div>

            <button
              disabled={submitted}
              className="button primary"
              style={{
                backgroundColor: `${submitted && countDown !== 'Iniciar trivia' ? 'green' : ''}`
              }}
              type="submit">
              { countDown }
            </button>
          </form>
        </div>
        
        <div className="wizard__footer">
          <p>Al pulsar iniciar, usted solo tendrá <u><b>10 segundos</b></u> por pregunta.</p>
        </div>
      </div>
    </div>
  )
}
