import React from 'react'
import { store } from '../store/Store'
import './styles.css'


const DataPage = (props) => {
    const data = store.getState().table[props.match.params.index]
    if (data === undefined) return <h1>404 not found</h1>
    console.log(data)
    return (
        <div className='info'>
            <p><b>Task:</b> {data[1]}</p>
            <p><b>Time Start:</b> {data[2]}</p>
            <p><b>Time End:</b> {data[3]}</p>
            <p><b>Time Spend:</b> {data[4]}</p>
        </div>
    )
}
export default DataPage