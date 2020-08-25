import React, { useEffect, useState } from 'react'
import { resetTriviaToken } from '../selectors/resetTriviaToken'
import useFecth from '../hooks/useFecth'

export const Reset = ({ history }) => {
  
  const token = localStorage.getItem('trivia_token')
  const [shouldResetToken, setShouldResetToken] = useState(false)
  const fetchReset = useFecth({
    fecthRequest: resetTriviaToken,
    shouldExecute: shouldResetToken,
    props: token
  })

  useEffect(() => {
    if(fetchReset.result) {
      alert('Token reiniciado')
      history.push('/')
    }
  }, [fetchReset, history])

  if (!!shouldResetToken && !fetchReset.executing) setShouldResetToken(false)

  return (
    <div className="content">
      <div className="content__subtitle">
        <h1>No quedan más preguntas en esta categoría</h1>
        <p>Puedes reiniciar tu token para volver a repetir los mismos cuestionarios.</p>
        <p>Nota importante: ESTO APLICARÁ A TODAS LAS CATEGORÍAS</p>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            history.push('/')
          }}
          className="button primary">Volver a inicio ✔</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            setShouldResetToken(true)
          }}
          className="button danger">Reiniciar token ⚠</button>
      </div>
    </div>
  )
}
