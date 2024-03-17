/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  dateRequested: MomentInput
  id: any
  header: string
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
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}
        />
        <Link
          className="capitalize font-semibold underline"
          href={`/patients/${props.row.original.id}`}
        >{`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'testName',
    header: 'Test'
  },
  {
    accessorKey: 'dateRequested',
    header: 'REQUESTED',
    cell: ({ row }) => (
      <p>{moment(row.original?.dateRequested).format('ll')}</p>
    )
  },
  {
    accessorKey: 'reason',
    header: 'Reason'
  },
  {
    accessorKey: 'urgency',
    header: 'Urgency'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/patients/${row.original.id}`}>more</Link>
    )
  }
]
