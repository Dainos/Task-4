import React from 'react';
import { connect } from 'react-redux'

import { Route, Switch } from 'react-router-dom'

import MainPage from './MainPage'
import DataPage from './DataPage'

// const pages = store.getState().table



const App = (props) => {

  

  return (
    <div>
      <Switch>
        <Route path='/' exact component={MainPage} />

        {props.table.map((item, index) => index > 0 ? <Route path={`/tasks/:index`} key={index} exact component={DataPage} /> : null)}
        <Route render={() => <h1>404 not found</h1>}/>
      </Switch>


      
    </div>
  )
}

const stateToProps = (state) => {

  return {
    currentTab: state.currentTab,
    currentTime: state.currentTime,
    currentName: state.currentName,
    timerId: state.timerId,
    table: state.table,
    showAlert: state.showAlert
  }
}

export default connect(stateToProps)(App);
