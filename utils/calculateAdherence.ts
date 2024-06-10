import moment, { type MomentInput } from 'moment'

export const calculateAdherence = (dateOfPrescription: MomentInput | string, pillsTaken: number, frequency: number) => {
  const currentDate = moment()
  const noDays = currentDate.diff(moment(dateOfPrescription), 'days')
  const totalNoOfDays = (noDays * frequency) + 1
  const adherence = (pillsTaken / totalNoOfDays) * 100
  return Number(adherence.toFixed(2))
}
