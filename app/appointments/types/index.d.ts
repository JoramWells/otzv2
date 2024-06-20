declare interface AppointmentProps {
  Patient: {
    firstName?: string
    middleName?: string
  }
  appointmentDate: MomentInput
  appointmentTime: MomentInput
  rescheduledDate: MomentInput
  rescheduledReason: string

  AppointmentAgenda: {
    agendaDescription: string
  }
  AppointmentStatus: {
    statusDescription: string
  }
  createdAt: Date
  updatedAt: Date
  id: string
}
