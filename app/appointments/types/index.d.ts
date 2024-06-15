declare interface AppointmentProps {
  Patient: {
    firstName?: string
    middleName?: string
  }
  appointmentDate: MomentInput
  appointmentTime: MomentInput
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
