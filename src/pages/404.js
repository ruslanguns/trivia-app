import React from 'react'

export const NotFound = ({ history }) => {
  return (
    <div className="content">
      <div className="content__subtitle">
        <h1> 404 Not Found</h1>
        <h2> Esta página no existe.</h2>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            history.push('/')
          }}
          class="button primary">Ir a página de inicio</button>
      </div>
    </div>
  )
}
