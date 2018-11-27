import React from 'react'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import JobsIndexContainer from '../containers/JobsIndexContainer.js'

export const App = (props) => {
  return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={JobsIndexContainer} />
        </Route>
      </Router>
  )
}

export default App;
