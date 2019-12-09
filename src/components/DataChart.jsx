import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { newDate } from '../helpers/helper'

const DataChart = props => {

    const { table, addGenerated } = props


    const data = [];
    const timeData = {};

    for (let i = 0; i < 24; i++) timeData[i] = 0


    for (let i = 1; i < table.length; i++) {
        let hours = moment(table[i][2], 'HH:mm:ss').format('HH')
        let minutes = moment(table[i][4], 'HH:mm:ss').format('mm')
        timeData[+hours[0]] += +minutes[1]
    }

    for (let i = 0; i < 24; i++) {
        data.push({ name: i, 'minutes of the hour': timeData[i] })
    }

    return (
        <div>
            <BarChart width={1300} height={400} data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Legend />
                <Bar type="monotone" dataKey="minutes of the hour" barSize={20} fill="#8884d8"
                    label='label' />
            </BarChart>
            <Button variant="contained" type="submit" color="primary" onClick={() => {generator(addGenerated)}}>GENERATE</Button>
        </div>

    )
}

let newTable = []

const generator = (addGenerated) => {
    const amount = Math.floor(Math.random()*5+10)
    newTable = []
    
    for(let i = 0; i < amount; i++) {

        newTable.push([])
        const duration = Math.floor(Math.random()*80+10)
        const hours = Math.floor(Math.random()*23)
        const minutes = Math.floor(Math.random()*59)
        newTable[i][0] = i
        newTable[i][1] = 'Random name'
        newTable[i][2] = newDate(undefined, hours, minutes)
        newTable[i][3] = newDate(newTable[i][2], undefined, duration)
        newTable[i][4] = newDate(undefined, undefined, duration)
    }
    addGenerated(newTable)

}


export default DataChart
