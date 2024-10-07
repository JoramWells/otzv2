import moment from 'moment'

export function checkTimeOfDay () {
  const now = moment()
  const morningEnds = moment().startOf('day').add(12, 'hours')
  const eveningStart = moment().startOf('day').add(18, 'hours')

  // check if time is morning, afternoon, evening
  if (now.isBefore(morningEnds)) {
    return 'Morning'
  } else if (now.isBefore(eveningStart)) {
    return 'Afternoon'
  } else {
    return 'Evening'
  }
}
