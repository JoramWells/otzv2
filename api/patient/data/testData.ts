import { type PatientAttributes } from 'otz-types'

enum UserRoles {
  Admin = 'admin',
  Clinician = 'clinician',
  MentorMother = 'mentor mother',
  AYPAdvocate = 'ayp advocate',
  Nurse = 'nurse',
  patient = 'patient',
}

export const patientTestData: PatientAttributes = {
  maritalStatus: 'married',
  role: UserRoles.patient
}
