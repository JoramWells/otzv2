/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { Clock } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { Avatar, Badge, Tag } from '@chakra-ui/react'
import moment, { type MomentInput } from 'moment'
import { calculateAge } from '@/utils/calculateAge'

import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
  messageText: any
  notificationType: any
  scheduleTime: MomentInput
  scheduleDate: MomentInput
  appointment: any
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
          name={`${row.original.appointment?.patient?.firstName} ${row.original.appointment?.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.appointment?.patient?.firstName} ${row.original.appointment?.patient?.middleName}`}</p>
          <p className="capitalize text-slate-500">
            {row.original.appointment?.patient?.sex}{' '}
          </p>
          <p className="capitalize text-slate-500">
            {calculateAge(row.original.appointment?.patient?.dob)} yrs
          </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'user',
    header: 'REQUESTED BY',
    cell: ({ row }: any) => (
      <p>{`${row.original.appointment?.user?.firstName} ${row.original.appointment?.user?.middleName}`}</p>
    )
  },
  {
    accessorKey: 'scheduleDate',
    header: 'Schedule Date',
    cell: ({ row }) => (
      <div className="flex flex-row gap-x-2">
        <Clock size={18} className="mt-1 text-slate-500" />
        <div className="flex flex-col space-y-2">
          <p>{moment(row.original.scheduleDate).format('ll')}</p>
          <p className="text-slate-500">
            {moment(row.original.scheduleTime, 'HH:mm ss').format('HH:mm a')}
          </p>
          <p className="font-bold text-slate-500">
            {moment
              .duration(moment(row.original.scheduleDate).diff(moment()))
              .days()}{' '}
            days remaining
          </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'messageText',
    header: 'Message ',
    cell: ({ row }) => (
      <p className="capitalize">{`${row.original.messageText}`}</p>
    )
  },
  {
    accessorKey: 'notificationType',
    header: 'Notification Type ',
    cell: ({ row }) => (
      <div>
        {row.original.notificationType === 'SMS'
          ? (
          <Badge colorScheme="purple"
          variant={'solid'}
          >SMS</Badge>
            )
          : (
          <Badge>Watsapp</Badge>
            )}
      </div>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'STATUS',
    cell: ({ row }) => {
      const appointmentStatus =
        row.original.appointmentStatus?.statusDescription
      if (appointmentStatus === 'Missed') {
        return (
          <Tag
            colorScheme="red"
            rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
        )
      } else if (appointmentStatus === 'Upcoming') {
        return (
          <Tag
            colorScheme="blue"
            rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
        )
      } else if (appointmentStatus === 'Pending') {
        return (
          <Tag
            colorScheme="orange"
            rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
        )
      } else if (appointmentStatus === 'Rescheduled') {
        return (
          <Tag
            colorScheme="teal"
            rounded={'full'}
          >{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
        )
      } else {
        <Tag
          rounded={'full'}
        >{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
      }
    }
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link href={`/notify/${row.original.id}`}>Edit </Link>
  }
]
