/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'

import Link from 'next/link'
import Avatar from '@/components/Avatar'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
  art: any
  refillDate: MomentInput
  appointmentTime: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  appointmentStatus: any
  user: any
  patient: any
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

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-start gap-x-2 pt-2 pb-2">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'currentARTRegimen',
    header: 'ART Regimen',
    cell: ({ row }) => <p>{row.original.art?.artName}</p>
  },
  {
    accessorKey: 'noOfPills',
    header: 'Total Pills'
  },
  {
    accessorKey: 'nofOfPills',
    header: 'Remaining Pills'
  },
  {
    accessorKey: 'refillDate',
    header: 'Refill Date',
    cell: ({ row }) => (
      <div>
        <p>{moment(row.original.refillDate).format('ll')}</p>
      </div>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link href={`/notify/${row.original.id}`}>Edit </Link>
  }
]
