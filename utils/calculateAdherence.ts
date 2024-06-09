import moment from 'moment'

export const calculateAdherence = (dateOfPrescription: string, pillsTaken: number, frequency: number) => {
  const currentDate = moment()
  const noDays = currentDate.diff(moment(dateOfPrescription), 'days')
  const totalNoOfDays = noDays * frequency
  const adherence = (pillsTaken / totalNoOfDays) * 100
  return Number(adherence.toFixed(2))
}
