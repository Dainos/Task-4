import React from 'react';
import { connect } from 'react-redux'

import { Route, Switch, HashRouter } from 'react-router-dom'

import MainPage from './MainPage'
import DataPage from './DataPage'

// const pages = store.getState().table



const App = (props) => {



  return (
    <div>
      <HashRouter basename='/'>
        <Switch>
          <Route path='/' exact component={MainPage} />
          {props.table.map((item, index) => index > 0 ? <Route path={`/tasks/:index`} key={index} exact component={DataPage} /> : null)}
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </HashRouter>



    </div>
  )
}

const stateToProps = (state) => {

  return {
    table: state.table
  }
}

export default connect(stateToProps)(App);
