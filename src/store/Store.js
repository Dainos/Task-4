import { createStore,/*  applyMiddleware  */} from 'redux' 
// import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers/Reducer'
// import { helloSaga } from '../sagas'

const initialState = {
    currentTab: 0,
    currentTime: 0,
    currentName: '',
    timerId: null,
    timeStart: null,
    timeEnd: null,
    dateStart: null,
    table: [
        ['№', 'Task', 'Time Start', 'Time End', 'Time Spend', 'Info', 'Delete']
    ],
    showAlert: false
}

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}


console.log(persistedState)

// const persistMiddleware = ({ getState(), dispatch }) => next => action => {
//     const result = next(action);
//     localStorage.set('my-state', JSON.stringify(getState());
//     return result;
// }

// const sagaMiddleware = createSagaMiddleware()

// const customMiddleware = store => next => action => {
//     const res = next(action)
//     return res
// }

const store = createStore(reducer/* , applyMiddleware(customMiddleware) */);

// sagaMiddleware.run(helloSaga)

export { store, initialState, persistedState }

