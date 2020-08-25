import React from 'react'
import { AppRouter } from './AppRouter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const App = () => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="main__container">
          <AppRouter />
        </div>
      </div>
      <Footer />
    </>
  )
}
