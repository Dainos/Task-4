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
import { styled } from '@material-ui/core/styles';
import './styles.css'
import moment from 'moment'

const MyButton = styled(Button)({
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 0 5px rgba(0,0,0,0.5)',
    color: 'blue',
    height: "40px",
    width: '70px',
    padding: '0 30px',
    marginBottom: '30px'
});

const Input = styled(TextField)({
    color: 'blue',
    textAlign: 'center',
})

const MyTab = styled(Tab)({
    backgroundColor: '#1FBCD3',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12pt'
})


class MainPage extends Component {

    changeTab = () => {
        const { currentTab, changeTab } = this.props
        if (currentTab === 1) changeTab(0)
        else changeTab(1)       
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

    delData = index => {
        const { table, deleteData } = this.props
        table.splice(index, 1)
        deleteData(index)
    }

    buttons = () => {
        
        if (this.props.timerId == null) return <MyButton onClick={this.startTimer}>Start</MyButton>
        else return <MyButton type="submit" onClick={this.stopTimer}>Stop</MyButton>
    }

    handleInput = (event) => {
        this.props.updateName(event.target.value)
    }

    timeRender = () => {
        const { currentTime } = this.props

        const time = moment('00:00:00', 'HH:mm:ss').add(currentTime, 'second')
      
        return {
            timeString: time.format('HH:mm:ss'),
            seconds: time.format('ss'),
            minutes: time.format('mm'),
            hours: time.format('HH'),
        }

    }

    alert = () => {
        console.log('trying alert')
        this.props.alert()
    }

    render() {

        const { currentTab, currentName, table, showAlert,addGenerated } = this.props
        const tabs = [
            (<DataTable table={table} deleteData={this.delData} />),
            (<DataChart table={table} addGenerated={addGenerated}/>)
        ]

        

        
        return (
            <div>
                <AlertDialog open={showAlert} handle={this.alert} />
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center">
                    <Input id="standard-basic" InputLabelProps = {{ color: "primary"}} value={currentName} label="Name of your task" margin='normal' /* color="primary" */ onChange={this.handleInput} />
                    <div className="timer">
                        <p className="time">{this.timeRender().timeString}</p>
                    </div>
                    
                    {this.buttons()}
                </Grid>
                <Tabs
                    value={currentTab}
                    indicatorColor="secondary"
                    variant="fullWidth"
                    onChange={this.changeTab}
                >
                    <MyTab label="TASKS LOG"></MyTab>
                    <MyTab label="TASKS CHART"></MyTab>
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
        addGenerated: (newTable) => dispatch(actions.addGenerated(newTable))
    }

}
export default connect(stateToProps, dispatchToProps)(MainPage)