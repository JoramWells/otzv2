/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'

export interface FullNameProps {
  firstName?: string
}

export interface PrescriptionProps {
  file: string
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

export const linelistColumn: Array<ColumnDef<PrescriptionProps>> = [
  {
    accessorKey: 'file',
    header: 'file',
    cell: ({ row }) => <Link
    href={`/etl/${row.original.id}`}
    className='text-blue-500'
    >{row.original.file.replace('csvs/', '').replace('.csv', '')}</Link>
  },
  {
    accessorKey: 'Updated',
    header: 'Updated',
    cell: ({ row }) => <p>
      {moment(row.original.createdAt).format('ll')}
    </p>
  }
]
