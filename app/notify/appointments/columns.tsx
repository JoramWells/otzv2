/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { Clock } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import { calculateAge } from '@/utils/calculateAge'

import Link from 'next/link'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
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
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}</p>
          <p className="capitalize text-slate-500">{row.original.patient?.sex} </p>
          <p className="capitalize text-slate-500">{calculateAge(row.original.patient?.dob)} yrs</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'user',
    header: 'REQUESTED BY',
    cell: ({ row }: any) => (
      <p>{`${row.original.user?.firstName} ${row.original.user?.middleName}`}</p>
    )
  },
  {
    accessorKey: 'appointmentDate',
    header: 'Appointment Date',
    cell: ({ row }) => (
      <div className="flex flex-row gap-x-2">
        <Clock size={18} className="mt-1 text-slate-500" />
        <div>
          <p>{moment(row.original.appointmentDate).format('ll')}</p>
          <p className="text-slate-500">
            {moment(row.original.appointmentTime, 'HH:mm ss').format('HH:mm a')}
          </p>
          <p className="font-bold text-slate-500">
            {moment
              .duration(moment(row.original.appointmentDate).diff(moment()))
              .days()}{' '}
            days remaining
          </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'appointmentAgenda',
    header: 'Appointment agenda',
    cell: ({ row }) => (
      <p>{`${row.original.appointmentAgenda?.agendaDescription}`}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'APPOINTMENT STATUS',
    cell: ({ row }) => {
      const appointmentStatus =
        row.original.appointmentStatus?.statusDescription
      if (appointmentStatus === 'Missed') {
        return (
          <Badge
            // colorScheme="red"
            // rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Badge>
        )
      } else if (appointmentStatus === 'Upcoming') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Badge>
        )
      } else if (appointmentStatus === 'Pending') {
        return (
          <Badge
            // colorScheme="orange"
            // rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Badge>
        )
      } else if (appointmentStatus === 'Rescheduled') {
        return (
          <Badge
            // colorScheme="teal"
            // rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Badge>
        )
      } else {
        <Badge
          // rounded={'full'}
        >{`${row.original.appointmentStatus?.statusDescription}`}</Badge>
      }
    }
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link
    href={`/notify/${row.original.id}`}
    >Edit </Link>
  }
]
