declare interface HomeVisitProps {
  ART: {
    artName: string
  }
  refillDate: MomentInput
  nextRefillDate: MomentInput
  returnToClinic: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  updatedAt: MomentInput
  createdAt: Date
  user: any
  patient: {
    firstName: string
    middleName: string
  }
  id: any
  header: string
//   accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}
