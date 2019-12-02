import { initialState, persistedState } from '../store/Store'
import * as actions from '../actions/actionTypes'

const timeFormat = (seconds, minutes, hours) => {
    if (hours < 10) hours = '0'+hours
    if (minutes < 10) minutes = '0'+minutes
    if (seconds < 10) seconds = '0'+seconds

    return `${hours}:${minutes}:${seconds}`
}





 function reducer(state = ( localStorage.length < 1 ? initialState : persistedState), action) {
    switch (action.type) {
        case actions.CHANGE_TAB:
            if (state.currentTab === 1) return {...state, currentTab: 0}
            else return {...state, currentTab: 1 }
        case actions.CHANGE_TIME:
            console.log('change')
            return {...state, currentTime: action.payload }
        case actions.SET_TIMER:
            
            const date = new Date()
            const dateStart = {
                seconds: date.getSeconds(),
                minutes: date.getMinutes(),
                hours: date.getHours()
            }
            console.log('creating new start date - ' + dateStart)
            return {...state, timerId: action.payload, dateStart: dateStart, timeStart: timeFormat(dateStart.seconds, dateStart.minutes, dateStart.hours)}
        case actions.STOP_TIMER:
            clearTimeout(state.timerId)
            const date2 = new Date()
            return {...state, timerId: null, currentTime: 0, timeEnd: timeFormat(date2.getSeconds(), date2.getMinutes(), date2.getHours()) }
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
            state.table.splice(action.payload, 1)
            return {...state, table: [...state.table]}
        case actions.RESTART_TIMER: 
            return {...state, currentTime: action.payload.time, timerId: action.payload.timerId}
        default: 
            return state
    }

}


export default reducer