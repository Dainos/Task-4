import { createStore, compose,  applyMiddleware } from 'redux' 
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers/Reducer'
import { rootSaga } from '../sagas'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const initialState = {
    currentTab: 0,
    currentTime: 0,
    currentName: '',
    timerId: null,
    timeStart: null,
    timeEnd: null,
    dateStart: null,
    table: [],
    showAlert: false
}


const sagaMiddleware = createSagaMiddleware()

const customMiddleware = store => next => action => {
    const res = next(action)
    return res
}

const store = createStore(reducer, composeEnhancers(applyMiddleware(customMiddleware, sagaMiddleware)));

sagaMiddleware.run(rootSaga)

export { store, initialState }

