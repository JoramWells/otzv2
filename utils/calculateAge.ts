import moment, { MomentInput } from "moment"

export const calculateAge = (dob: MomentInput) =>{
    const today = moment()
    const age = today.diff(moment(dob), 'years')
    return age
}