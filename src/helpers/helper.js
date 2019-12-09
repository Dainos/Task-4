import moment from 'moment'

export const dateHelper = () => {

}

export const newDate = (date = '00:00:00', hours = 0, minutes = 0, seconds = 0) => {
    return moment(date, 'HH:mm:ss').add(hours, 'hours').add(minutes, 'minute').add(seconds, 'second').format('HH:mm:ss')
}