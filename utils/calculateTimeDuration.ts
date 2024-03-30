import moment, { type MomentInput } from 'moment'

export function calculateTimeDuration (days: MomentInput) {
  let durationString

  const durationInDays = moment(days).diff(moment(), 'days')

  //
  if (durationInDays > 30) {
    if (durationInDays >= 30) {
      const months = Math.floor(durationInDays / 30)
      durationString =
        months === 1 ? `${months} month from now` : `${months} months from now`
    } else if (durationInDays >= 7) {
      const weeks = Math.floor(durationInDays / 7)
      durationString =
        weeks === 1 ? `${weeks} week from now` : `${weeks} weeks from now`
    } else {
      durationString =
        durationInDays === 1
          ? `${durationInDays} day from now`
          : `${durationInDays} days from now`
    }
  } else if (durationInDays < 0) {
    const durationInDaysAbsolute = Math.abs(
      moment(days).diff(moment(), 'days')
    )

    if (durationInDaysAbsolute >= 30) {
      const months = Math.floor(durationInDaysAbsolute / 30)
      durationString =
        months === 1 ? `${months} month ago` : `${months} months ago`
    } else if (durationInDaysAbsolute >= 7) {
      const weeks = Math.floor(durationInDaysAbsolute / 7)
      durationString = weeks === 1 ? `${weeks} week` : `${weeks} weeks ago`
    } else {
      durationString =
        durationInDaysAbsolute === 1
          ? `${durationInDaysAbsolute} day ago`
          : `${durationInDaysAbsolute} day ago`
    }
  }

  return durationString
}
