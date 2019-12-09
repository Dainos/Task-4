import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import * as actions from '../actions/actions'
import DataTable from '../components/DataTable'
import DataChart from '../components/DataChart'
import AlertDialog from '../components/AlertDialog'
const moment = require('moment');


class MainPage extends Component {

    changeTab = () => {
        const { currentTab, changeTab } = this.props
        if (currentTab === 1) changeTab(0)
        else changeTab(1)
        // console.log(moment().format('HH:mm:ss'))
        // console.log(moment('00:00:00', 'HH:mm:ss').add(150, 'second').format('HH:mm:ss'))

        
    }

    startTimer = () => {
        const { currentTime, changeTime, setTimer } = this.props
        let time = currentTime
        let timerId = setInterval(() => {
            changeTime(++time)
        }, 1000)
        const dateStart = {
            seconds: moment().seconds(),
            minutes: moment().minutes(),
            hours: moment().hours(),
            timeStart: moment().format('HH:mm:ss'),
            timerId
        }

        setTimer(dateStart)
    }


    stopTimer = () => {
        const { timerId, stopTimer, addData, currentName } = this.props

        if (currentName === '') {
            this.alert()
            return
        }
        clearTimeout(timerId)
        const timeEnd = moment().format('HH:mm:ss')
        stopTimer(timeEnd)
        addData(this.timeRender().timeString)
    }

    restartTimer = () => {
        console.log('restartTimer')
        // const localState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
        // const { dateStart, changeTime, restartTimer, currentTime } = this.props

        // if (dateStart === null) return

        // const newCurrentDate = new Date()
        // let newCurrentSeconds = this.subTime(newCurrentDate.getSeconds(), dateStart.seconds) + this.subTime(newCurrentDate.getMinutes(), dateStart.minutes) * 60 + this.subTime(newCurrentDate.getHours(), dateStart.hours) * 3600

        // if (localState.timerId !== null && newCurrentSeconds > currentTime) {

        //     clearTimeout(localState.table.timerId)

        //     console.log(currentTime)

        //     let newCurrentTime = this.timeFormat(this.subTime(newCurrentDate.getSeconds(), dateStart.seconds), this.subTime(newCurrentDate.getMinutes(), dateStart.minutes), this.subTime(newCurrentDate.getHours(), dateStart.hours))
        //     let timerId = setInterval(() => { changeTime(++newCurrentSeconds) }, 1000)
        //     console.log(this.subTime(newCurrentDate.getSeconds(), this.timeRender().seconds))
        //     restartTimer(newCurrentTime, timerId)
        // }
    }

    // subTime = (t1, t2) => {
    //     if (t1 >= t2) return t1 - t2
    //     else return t1 - t2 + 60
    // }


    delData = index => {
        const { table, deleteData } = this.props
        table.splice(index, 1)
        deleteData(index)
    }

    buttons = () => {
        if (this.props.timerId == null) return <Button variant="contained" type="submit" color="primary" onClick={this.startTimer}>Start</Button>
        else return <Button variant="contained" type="submit" color="primary" onClick={this.stopTimer}>Stop</Button>
    }

    handleInput = (event) => {
        this.props.updateName(event.target.value)
    }

    timeRender = () => {
        const { currentTime } = this.props
      
        return {
            timeString: moment('00:00:00', 'HH:mm:ss').add(currentTime, 'second').format('HH:mm:ss'),
            seconds: moment('00:00:00', 'HH:mm:ss').add(currentTime, 'second').format('ss'),
            minutes: moment('00:00:00', 'HH:mm:ss').add(currentTime, 'second').format('mm'),
            hours: moment('00:00:00', 'HH:mm:ss').add(currentTime, 'second').format('HH'),
        }

    }

    alert = () => {
        console.log('trying alert')
        this.props.alert()
    }

    render() {

        const { currentTab, currentName, table, showAlert } = this.props
        const tabs = [
            (<DataTable table={table} deleteData={this.delData} />),
            (<DataChart />)
        ]

        
        return (
            <div>
                <AlertDialog open={showAlert} handle={this.alert} />
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center">
                    <TextField id="standard-basic" value={currentName} label="Name of your task" color="primary" onChange={this.handleInput} />
                    <h1>{this.timeRender().timeString}</h1>
                    {this.buttons()}
                </Grid>
                <Tabs
                    value={currentTab}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="fullWidth"
                    onChange={this.changeTab}
                >
                    <Tab label="TASKS LOG"></Tab>
                    <Tab label="TASKS CHART"></Tab>
                </Tabs>
                {tabs[currentTab]}

            </div>
        )
    }
}

const stateToProps = (state) => {

    return {
        currentTab: state.currentTab,
        currentTime: state.currentTime,
        currentName: state.currentName,
        timerId: state.timerId,
        dateStart: state.dateStart,
        table: state.table,
        showAlert: state.showAlert
    }
}

const dispatchToProps = (dispatch) => {

    return {
        changeTab: (tab) => dispatch(actions.changeTab(tab)),
        changeTime: time => dispatch(actions.changeTime(time)),
        setTimer: (timeriD) => dispatch(actions.setTimer(timeriD)),
        stopTimer: (timeEnd) => dispatch(actions.stopTimer(timeEnd)),
        addData: (data) => dispatch(actions.addData(data)),
        updateName: (name) => dispatch(actions.updateName(name)),
        alert: () => dispatch(actions.alert()),
        deleteData: (index) => dispatch(actions.deleteData(index)),
    }

}
export default connect(stateToProps, dispatchToProps)(MainPage)