/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
import { type ReactNode } from 'react'
import Avatar from '../_components/Avatar'
import { Badge } from '@/components/ui/badge'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  isVLValid: boolean
  dateOfVL: MomentInput
  vlJustification: string
  vlResults: string
  patient: any
  sex: ReactNode
  dob: MomentInput
  firstName: any
  school: any
  id: any
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row space-x-4 items-center pt-2 pb-2">
        <Avatar
          name={`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize"
            href={`/patients/${row.original.id}`}
          >{`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}</Link>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'vlResults',
    header: 'VL Results',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-4">
        <p className="font-bold text-slate-500">{row.original.vlResults}</p>
      </div>
    )
  },
  {
    accessorKey: 'vlJustification',
    header: 'Justification',
    cell: ({ row }) => (
      <div className="w-[200px]">
        <p>{row.original.vlJustification}</p>
      </div>
    )
  },
  {
    accessorKey: 'dateOfVL',
    header: 'VL Date',
    cell: ({ row }) => <p> {moment(row.original.dateOfVL).format('ll')} </p>
  },
  {
    accessorKey: 'isVLValid',
    header: 'Status',
    cell: ({ row }) => (
      <div>
        {row.original.isVLValid ? <Badge
        className='rounded-full bg-teal-100 text-teal-600 shadow-none'
        >Valid</Badge> : <Badge
        className='bg-red-50 text-red-500 shadow-none rounded-full'
        >Invalid</Badge> }
      </div>
    )
  }
]
