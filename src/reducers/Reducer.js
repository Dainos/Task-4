import { initialState } from '../store/Store'
import * as actions from '../actions/actions'

function reducer(state = (initialState), action) {
    switch (action.type) {
        case actions.CHANGE_TAB:
            return {...state, currentTab: action.payload}
        case actions.CHANGE_TIME:
            return {...state, currentTime: action.payload }
        case actions.SET_TIMER:
            return {...state, timerId: action.payload.timerId, dateStart: action.payload.dateStart, timeStart: action.payload.timeStart}
        case actions.STOP_TIMER:
            return {...state, timerId: null, currentTime: 0, timeEnd: action.payload }
        case actions.ADD_DATA:
            return {...state, table: [...state.table, [
                state.table.length,
                state.currentName,
                state.timeStart,
                state.timeEnd,
                action.payload
            ]], currentName: '' }            
        case actions.UPDATE_NAME:
            return {...state, currentName: action.payload }
        case actions.ALERT : 
            return {...state, showAlert: !state.showAlert }
        case actions.DELETE_DATA:
            return {...state, table: [...state.table]}
        case actions.RESTART_TIMER: 
            return {...state, currentTime: action.payload.time, timerId: action.payload.timerId}
        case actions.UPDATE_FROM_LOCALSTORAGE:
            return action.payload
        case actions.ADD_GENERATED:
            return {...state, table: action.payload}
        default: 
            return state
    }
}


export default reducer