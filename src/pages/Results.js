import React from 'react'

export const Results = ({history, location}) => {

  const correctAnswers = location.state?.correctAnswers

  return (
    <div className="content">
      <div className="content__subtitle">
        {
          location.state.timeOut && <h1>¡Oups! Se te ha agotado el tiempo</h1>
        }
        {
        !location.state.timeOut && <h1>¡Has terminado!</h1>
        }
        <h2>Has logrado un {correctAnswers} de 5</h2>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            history.push('/')
          }}
          className="button primary">Generar nueva trivia</button>
      </div>
    </div>
  )
}
