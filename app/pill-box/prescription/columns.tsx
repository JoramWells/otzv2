/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'

import Avatar from '@/components/Avatar'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface PrescriptionProps {
  ART: {
    artName: string
  }
  refillDate: MomentInput
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

export const columns: Array<ColumnDef<PrescriptionProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 pt-4 pb-4 lg:pt-2 lg:pb-2 xl:pt-0 xl:pb-0 xxl:pt-0 xxl:pb-0">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'currentARTRegimen',
    header: 'ART Regimen',
    cell: ({ row }) => <p>{row.original.ART?.artName}</p>
  },
  {
    accessorKey: 'frequency',
    header: 'Times'
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
    accessorKey: 'nextRefillDate',
    header: 'Next Refill Date',
    cell: ({ row }) => (
      <div>
        <p>{moment(row.original.nextRefillDate).format('ll')}</p>
      </div>
    )
  }
]
