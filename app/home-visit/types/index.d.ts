declare interface HomeVisitProps {
  ART: {
    artName: string
  }
  refillDate: MomentInput
  noOfPills: number
  returnToClinic: MomentInput
  medicineStatus: string
  dateRequested: MomentInput
  isDisclosure: boolean
  isHouseholdTested: boolean
  isSupportGroupAttendance: boolean
  updatedAt: MomentInput
  createdAt: Date
  homeVisitFrequency: {
    homeVisitFrequencyDescription: string
  }
  homeVisitReason: {
    homeVisitReasonDescription: string
  }
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
