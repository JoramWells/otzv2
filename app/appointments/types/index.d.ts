import { type PatientAttributes } from 'otz-types'

declare interface AppointmentProps {
  Patient: PatientAttributes
  appointmentDate: MomentInput
  appointmentTime: MomentInput
  rescheduledDate: MomentInput
  rescheduledReason: string

  AppointmentAgenda: {
    agendaDescription: string
  }
  AppointmentStatus: {
    statusDescription: 'Pending' | 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled'

  }
  createdAt: Date
  updatedAt: Date
  id: string
}
