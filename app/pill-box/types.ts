import { type MomentInput } from 'moment'

export interface PrescriptionProps {
  patientVisitID?: string
  frequency: number
  computedNoOfPills: number
  expectedNoOfPills: number
  noOfPills: number
  adherence?: number
  ART?: {
    artName: string
  }
  refillDate: MomentInput | string
  nextRefillDate: MomentInput | string
  appointmentTime?: MomentInput
  appointmentDate?: any
  appointmentAgenda?: any
  createdAt?: Date
  user?: any
  Patient?: any
  id?: any
  header?: string
  // render?: (props: any) => React.ReactNode
}
