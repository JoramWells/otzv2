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
  User: {
    firstName: string
    middleName: string
  }
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
    cell: ({ row }) => (
      <Link
        href={`/etl/${row.original.id}`}
        className="text-blue-500 text-[12px] "
      >
        {row.original.file.replace('csvs/', '').replace('.csv', '')}
      </Link>
    )
  },
  {
    accessorKey: 'uploaded',
    header: 'Uploaded By',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500 font-semibold">
        {row.original?.User?.firstName} {row.original?.User?.middleName}
      </p>
    )
  },
  {
    accessorKey: 'Updated',
    header: 'Updated',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">
        {moment(row.original.createdAt).calendar()}
      </p>
    )
  }
]
