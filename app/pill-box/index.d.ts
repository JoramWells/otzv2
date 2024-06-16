import { type MomentInput } from 'moment'

declare interface PrescriptionProps {
  patientVisitID?: string
  frequency: number
  computedNoOfPills: number
  expectedNoOfPills: number
  noOfPills: number
  adherence?: number
  ART?: {
    artName: string
  }
  refillDate: Date
  nextRefillDate: Date
  appointmentTime?: MomentInput
  appointmentDate?: any
  appointmentAgenda?: any
  createdAt: Date | string
  updatedAt?: Date
  user?: any
  Patient?: any
  id?: any
  header?: string
  // render?: (props: any) => React.ReactNode
}
