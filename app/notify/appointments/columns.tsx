/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'

import Link from 'next/link'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
  Patient: {
    firstName?: string
    middleName?: string
  }
  appointmentDate: MomentInput
  appointmentTime: MomentInput
  AppointmentAgenda: {
    agendaDescription: string
  }
  AppointmentStatus: {
    statusDescription: string
  }
  createdAt: Date
  id: string
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
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <p className="capitalize font-semibold">{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</p>
      </div>
    )
  },
  // {
  //   accessorKey: 'user',
  //   header: 'REQUESTED BY',
  //   cell: ({ row }: any) => (
  //     <p>{`${row.original.user?.firstName} ${row.original.user?.middleName}`}</p>
  //   )
  // },
  {
    accessorKey: 'appointmentDate',
    header: 'Appointment Date',
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2 pt-1.5 pb-1.5">
        <p>{moment(row.original.appointmentDate).format('ll')}</p>
        {/*
          <p className="text-sm text-slate-500">
            {moment
              .duration(moment(row.original.appointmentDate).diff(moment()))
              .days()}{' '}
            days remaining
          </p> */}
      </div>
    )
  },
  {
    accessorKey: 'appointmentTime',
    header: 'Appointment Time',
    cell: ({ row }) => (
      <p className="text-slate-500">
        {moment(row.original.appointmentTime, 'HH:mm ss').format('HH:mm a')}
      </p>
    )
  },
  {
    accessorKey: 'appointmentAgenda',
    header: 'Appointment agenda',
    cell: ({ row }) => (
      <p>{`${row.original.AppointmentAgenda?.agendaDescription}`}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'APPOINTMENT STATUS',
    cell: ({ row }) => {
      const appointmentStatus =
        row.original.AppointmentStatus?.statusDescription
      if (appointmentStatus === 'Missed') {
        return (
          <Badge
            // colorScheme="red"
            // rounded={'full'}
            className="rounded-full"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Upcoming') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
            className="rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50 shadow-none"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Pending') {
        return (
          <Badge
            // colorScheme="orange"
            // rounded={'full'}
            className="rounded-full shadow-none bg-orange-50 text-orange-500 hover:bg-orange-50"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Rescheduled') {
        return (
          <Badge
            // colorScheme="teal"
            // rounded={'full'}
            className="rounded-full bg-teal-50 text-teal-600 shadow-none  hover:bg-teal-50"
          >
            {appointmentStatus}
          </Badge>
        )
      } else {
        <Badge
          // rounded={'full'}
          className="rounded-full"
        >
          {appointmentStatus}
        </Badge>
      }
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Action',
    cell: ({ row }) => (<p>{moment(row.original.createdAt).format('ll')} </p>)
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link href={`/notify/${row.original.id}`}>Edit </Link>
  }
]
