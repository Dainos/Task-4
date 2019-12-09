
import * as actions from '../actions/actions'
import { store } from '../store/Store'
import { put, takeEvery, all } from 'redux-saga/effects'
const moment = require('moment');

const actionsArr = [
  actions.CHANGE_TAB,
  actions.CHANGE_TIME,
  actions.SET_TIMER,
  actions.STOP_TIMER,
  actions.ADD_DATA,
  actions.UPDATE_NAME,
  actions.ALERT,
  actions.DELETE_DATA
]

function* restartTimer () {
  yield delay(100)
  let timeStart = moment(store.getState().timeStart, 'HH:mm:ss')
  let timeStartSeconds = timeStart.seconds() + timeStart.minutes()*60 + timeStart.hours()*3600
  let currentTime = moment().subtract(timeStartSeconds, 'second')
  let currentTimeSeconds = currentTime.seconds() + currentTime.minutes()*60 + currentTime.hours()*3600
  if (store.getState().timerId > 0) { 
    clearTimeout(store.getState().timerId)
    yield delay(50)
    for(;;) {
      yield delay(1000)
      if (store.getState().timerId === null) break
      yield put(actions.changeTime(++currentTimeSeconds))
    }
  }    
}

function* updateStore() {
  const newStore = JSON.parse(localStorage.getItem('applicationState'))
  console.log(newStore)
  if (newStore !== null) yield put(actions.updateFromLS(newStore))
  else return  
}

const delay = ms => new Promise(res => setTimeout(res, ms))

function* updateLocalStorage() {

    yield delay(200)
    localStorage.setItem('applicationState', JSON.stringify(
      store.getState()
  ));
}

// function* watchStopingTomer() {
  
// }
  
function* watchChangingStore() {
  yield takeEvery(actionsArr, updateLocalStorage)
  yield takeEvery(actionsArr[3], restartTimer)
}

export function* rootSaga() {
  yield all([
    updateStore(),
    restartTimer(),
    updateLocalStorage(),
    watchChangingStore(),
    // watchStopingTomer(),    
  ])
}