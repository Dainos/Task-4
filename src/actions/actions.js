import * as actions from '../actions/actionTypes'

// const changeTab = () => {    
//     return {
//         type: actions.CHANGE_TAB
//     }
// }

export function changeTab () {    
    return {
        type: actions.CHANGE_TAB
    }
}

const changeTime = time => {    
    return {
        type: actions.CHANGE_TIME,
        payload: time
    }
}
const setTimer = timeriD => {    
    return {
        type: actions.SET_TIMER,
        payload: timeriD
    }
}
const stopTimer = () => {    
    return {
        type: actions.STOP_TIMER
    }
}
const addData = data => {    
    return {
        type: actions.ADD_DATA,
        payload: data
    }
}
const updateName = name => {    
    return {
        type: actions.UPDATE_NAME,
        payload: name
    }
}
const alert = () => {    
    return {
        type: actions.ALERT
    }
}
const deleteData = index => {    
    return {
        type: actions.DELETE_DATA,
        payload: index
    }
}





export {/* changeTab, */ changeTime, setTimer, stopTimer, addData, updateName, alert, deleteData}