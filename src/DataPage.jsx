import React from 'react'
import { store } from './store/Store'


const DataPage = (props) => {
    const data = store.getState().table[props.match.params.index]
    if (data === undefined) return <h1>404 not found</h1>
    console.log(data)
    return (
        <div>
            <h1>Task: {data[1]}</h1>
            <h1>Time Start: {data[2]}</h1>
            <h1>Time End: {data[3]}</h1>
            <h1>Time Spend {data[4]}</h1>
        </div>
    )
}
export default DataPage