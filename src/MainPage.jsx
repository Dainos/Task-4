import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import DataTable from './DataTable'
import AlertDialog from './AlertDialog'



class MainPage extends Component {

    startTimer = () => {
        const { currentTime, changeTime, setTimer } = this.props
        let time = currentTime
        let timerId = setInterval(() => {
            changeTime(++time)
        }, 1000)
        setTimer(timerId)
    }


    stopTimer = () => {
        if (this.props.currentName === '') {
            this.alert()
            return
        }
        this.props.stopTimer()
        this.props.addData(this.timeRender().timeString)
        console.log(this.props)
    }

    restartTimer = () => {
        const localState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
        const { dateStart, changeTime, restartTimer, currentTime } = this.props

        const newCurrentDate = new Date()
        let newCurrentSeconds = this.subTime(newCurrentDate.getSeconds(), dateStart.seconds) + this.subTime(newCurrentDate.getMinutes(), dateStart.minutes)*60+ this.subTime(newCurrentDate.getHours(), dateStart.hours)*3600
       
        if (localState.timerId !== null && newCurrentSeconds > currentTime){

            clearTimeout(localState.table.timerId)

            console.log(currentTime)

            let newCurrentTime = this.timeFormat(this.subTime(newCurrentDate.getSeconds(), dateStart.seconds), this.subTime(newCurrentDate.getMinutes(), dateStart.minutes), this.subTime(newCurrentDate.getHours(), dateStart.hours))
            let timerId = setInterval(() => {changeTime(++newCurrentSeconds)}, 1000)
            console.log(this.subTime(newCurrentDate.getSeconds(), this.timeRender().seconds))
            restartTimer(newCurrentTime, timerId)
        }
    }
    subTime = (t1, t2) => {
        if (t1 >= t2) return t1 - t2
        else return t1 - t2 + 60
    }


    delData = index => {
        this.props.deleteData(index)
    }

    buttons = () => {
        if (this.props.timerId == null) return <Button variant="contained" type="submit" color="primary" onClick={this.startTimer}>Start</Button>
        else return <Button variant="contained" type="submit" color="primary" onClick={this.stopTimer}>Stop</Button>
    }

    handleInput = (event) => {
        this.props.updateName(event.target.value)
    }


    timeFormat = (seconds, minutes, hours) => {
        if (hours < 10) hours = '0' + hours
        if (minutes < 10) minutes = '0' + minutes
        if (seconds < 10) seconds = '0' + seconds

        return `${hours}:${minutes}:${seconds}`
    }

    timeRender = () => {
        let time = this.props.currentTime, seconds, minutes, hours
        if (time < 60) {
            seconds = time
            minutes = 0
            hours = 0
        }
        else if (time < 3600) {
            minutes = Math.floor(time / 60)
            seconds = time % 60
            hours = 0
        }
        else {
            hours = Math.floor(time / 3600)
            minutes = Math.floor(time % 3600 / 60)
            seconds = Math.floor(time % 3600 % 60)
        }


        return {
            timeString: this.timeFormat(seconds, minutes, hours),
            seconds,
            minutes,
            hours
        }

    }

    alert = () => {
        console.log('trying alert')
        this.props.alert()
    }

    render() {

        const { currentTab, changeTab, currentName, table, showAlert } = this.props
        const tabs = [
            (<DataTable table={table} deleteData={this.delData} />),
            (<h1>TASKS CHART</h1>)
        ]

        this.restartTimer()


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
                    onChange={changeTab}
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
        changeTab: () => dispatch({ type: 'CHANGE_TAB' }),
        changeTime: time => dispatch({ type: 'CHANGE_TIME', payload: time }),
        setTimer: (timeriD) => dispatch({ type: 'SET_TIMER', payload: timeriD }),
        stopTimer: () => dispatch({ type: 'STOP_TIMER' }),
        addData: (data) => dispatch({ type: 'ADD_DATA', payload: data }),
        updateName: (name) => dispatch({ type: 'UPDATE_NAME', payload: name }),
        alert: () => dispatch({ type: 'ALERT' }),
        deleteData: (index) => dispatch({ type: 'DELETE_DATA', payload: index }),
        restartTimer: (time, timerId) => dispatch({ type: 'RESTART_TIMER', payload: { time, timerId } }),
    }

    // return {
    //   changeTab: () =>  dispatch(actions.changeTab),
    //   changeTime: time => dispatch(actions.changeTime(time)),
    //   setTimer: (timeriD) => dispatch(actions.setTimer(timeriD)),
    //   stopTimer: () => dispatch(actions.stopTimer),
    //   addData: (data) => dispatch(actions.addData(data)),
    //   updateName: (name) => dispatch(actions.updateName(name)),
    //   alert: () => dispatch(actions.alert),
    //   deleteData: (index) => dispatch(actions.deleteData(index)),
    // }

}

export default connect(stateToProps, dispatchToProps)(MainPage);
