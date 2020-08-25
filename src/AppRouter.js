import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { Wizard } from './pages/Wizard'
import { Trivia } from './pages/Trivia'
import { NotFound } from './pages/404'
import { Results } from './pages/Results'
import { Reset } from './pages/Reset'


export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/trivia" component={Trivia} />
        <Route exact path="/" component={Wizard} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/reset" component={Reset} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
