/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { Avatar, Tag, TagLeftIcon } from '@chakra-ui/react'
import { type MomentInput } from 'moment'

import Link from 'next/link'
import { Check, X } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
  eveningStatus: any
  morningStatus: any
  timeAndWork: any
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
      <div className="flex flex-row items-start gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${row.original.timeAndWork?.patient?.firstName} ${row.original.timeAndWork?.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.timeAndWork?.patient?.firstName} ${row.original.timeAndWork?.patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  // <X />
  {
    accessorKey: 'currentARTRegimen',
    header: 'Morning Status',
    cell: ({ row }) => (
      <div>
        <p>{row.original.timeAndWork?.morningTime}</p>
        <div>
          {row.original?.morningStatus
            ? (
            <Tag>
              <TagLeftIcon as={Check} />
              Completed
            </Tag>
              )
            : (
            <Tag>
              <TagLeftIcon as={X} />
              Completed
            </Tag>
              )}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'RT',
    header: 'Evening Status',
    cell: ({ row }) => (
      <div>
        <p>{row.original.timeAndWork?.eveningTime}</p>
        <div>
          {row.original?.eveningStatus
            ? (
            <Tag>
              <TagLeftIcon as={Check} />
              Completed
            </Tag>
              )
            : (
            <Tag>
              <TagLeftIcon as={X} />
              Completed
            </Tag>
              )}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'nofOfPills',
    header: 'Remaining Pills'
  },

  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link href={`/notify/${row.original.id}`}>Edit </Link>
  }
]
