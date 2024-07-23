/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { type MomentInput } from 'moment'

export interface FullNameProps {
  firstName?: string
}

export interface PrescriptionProps {
  frequency: number
  computedNoOfPills: number
  expectedNoOfPills: number
  noOfPills: number
  ART: {
    artName: string
  }
  refillDate: MomentInput | string
  nextRefillDate: MomentInput
  appointmentTime: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  createdAt: Date
  user: any
  Patient: any
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  age?: number
  dob?: string
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const facilityMAPColumns: Array<ColumnDef<PrescriptionProps>> = [
  {
    accessorKey: 'Age Group',
    header: 'Age Group'
    // cell: ({ row }) => <p>{row.original.ART?.artName}</p>
  },
  {
    accessorKey: 'Gender',
    header: 'Gender'
  },
  {
    accessorKey: 'Regimen Line',
    header: 'Regimen Line'
  },
  {
    accessorKey: 'Regimen',
    header: 'Regimen'
  },
  {
    accessorKey: 'Count',
    header: 'Count'
  }
]
