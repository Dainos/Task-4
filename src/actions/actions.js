
export const CHANGE_TAB = 'CHANGE_TAB'
export const CHANGE_TIME = 'CHANGE_TIME'
export const STOP_TIMER = 'STOP_TIMER'
export const SET_TIMER = 'SET_TIMER'
export const RESET_TIMER = 'RESET_TIMER'
export const ADD_DATA = 'ADD_DATA'
export const UPDATE_NAME = 'UPDATE_NAME'
export const DELETE_DATA = 'DELETE_DATA'
export const ALERT = 'ALERT'
export const RESTART_TIMER = 'RESTART_TIMER'
export const UPDATE_FROM_LOCALSTORAGE = 'UPDATE_FROM_LOCALSTORAGE'
export const ADD_GENERATED = 'ADD_GENERATED'

const changeTab = (tab) => {    
    return {
        type: CHANGE_TAB,
        payload: tab
    }
}
const changeTime = time => {    
    return {
        type: CHANGE_TIME,
        payload: time
    }
}
const setTimer = timeriD => {    
    return {
        type: SET_TIMER,
        payload: timeriD
    }
}
const stopTimer = (timeEnd) => {    
    return {
        type: STOP_TIMER,
        payload: timeEnd
    }
}
const addData = data => {    
    return {
        type: ADD_DATA,
        payload: data
    }
}
const updateName = name => {    
    return {
        type: UPDATE_NAME,
        payload: name
    }
}
const alert = () => {    
    return {
        type: ALERT
    }
}
const deleteData = index => {    
    return {
        type: DELETE_DATA,
        payload: index
    }
}

const updateFromLS = store => {
    return {
        type: UPDATE_FROM_LOCALSTORAGE,
        payload: store
    }
}
const addGenerated = table => {
    return {
        type: ADD_GENERATED,
        payload: table
    }
}





export {changeTab, changeTime, setTimer, stopTimer, addData, updateName, alert, deleteData, updateFromLS, addGenerated}