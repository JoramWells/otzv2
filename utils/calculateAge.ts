import moment, { type MomentInput } from 'moment'

export function calculateAge (dob: MomentInput) {
  const today = moment()
  const age = today.diff(moment(dob), 'years')
  return age
}
