/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import Link from 'next/link'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { type ExtendedAppointmentInputProps } from '@/api/appointment/appointment.api.'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { FaEdit } from 'react-icons/fa'

const days = [
  {
    day: 'Sunday'
  },
  {
    day: 'Monday'
  },
  {
    day: 'Tuesday'
  },
  {
    day: 'Wednesday'
  },
  {
    day: 'Thursday'
  },
  {
    day: 'Friday'
  },
  {
    day: 'Saturday'
  }
]
export interface FullNameProps {
  firstName?: string
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

export const columns: Array<ColumnDef<ExtendedAppointmentInputProps>> = [
  {
    accessorKey: 'patient',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <Link
          className="capitalize text-blue-500 text-[12px] hover:underline hover:cursor-pointer "
          href={`/users/patients/tab/dashboard/${row.original.patientID}`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
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
    accessorKey: 'appointmentAgenda',
    header: 'Agenda',
    cell: ({ row }) => (
      <p className="capitalize text-[12px] text-slate-500 ">{`${row.original.AppointmentAgenda?.agendaDescription}`}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'Status',
    cell: ({ row }) => {
      const appointmentStatus =
        row.original.AppointmentStatus?.statusDescription
      if (appointmentStatus === ('Missed' as string)) {
        return (
          <Badge
            // colorScheme="red"
            // rounded={'full'}
            className="rounded-full border border-red-200 hover:bg-red-50 bg-red-50 text-red-500 shadow-none text-[12px] "
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Upcoming') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
            className="rounded-full bg-blue-50 border border-slate-200 text-blue-500 hover:bg-blue-50 shadow-none"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Completed') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
            className="rounded-full border border-slate-200 bg-emerald-50 text-emerald-500 hover:bg-emerald-50 shadow-none"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Pending') {
        return (
          <Badge
            // colorScheme="orange"
            // rounded={'full'}
            className="rounded-full border border-orange-200 shadow-none bg-orange-50 text-orange-500 hover:bg-orange-50"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Rescheduled') {
        return (
          <Badge
            // colorScheme="teal"
            // rounded={'full'}
            className="rounded-full bg-teal-50 border border-teal-200 text-teal-600 shadow-none  hover:bg-teal-50"
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
    accessorKey: 'appointmentDate',
    header: 'Date',
    cell: ({ row }) => (
      <div className="flex flex-col text-[12px]">
        <div className="flex flex-row space-x-1 items-center font-semibold text-slate-500">
          <Calendar size={14} className="text-slate-400" />
          <p>{moment(row.original.appointmentDate).format('ll')}</p>
        </div>
        <div className="flex-row flex space-x-1 items-center">
          <Clock size={14} className="text-slate-400" />
          <p className="text-slate-500 text-[12px]">
            {moment(row.original.appointmentTime, 'HH:mm ss').format('HH:mm a')}
          </p>
        </div>
      </div>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()
      return (
      <>

        <ArrowRight
          size={18}
          className="hover:cursor-pointer hover:text-slate-500 text-slate-400 "
          onClick={() => {
            router.push(`/appointments/${row.original.id}`)
          }}
        />
      </>
      )
    }
  }
]

//
export const rescheduledColumns: Array<ColumnDef<ExtendedAppointmentInputProps>> = [
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
        <Link
          className="capitalize text-blue-500 text-[12px] hover:underline hover:cursor-pointer "
          href={`/users/patients/tab/dashboard/${row.original.patientID}`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>{' '}
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
    accessorKey: 'rescheduledReason',
    header: 'Reason',
    cell: ({ row }) => (
      <p className="text-slate-500">{row.original.rescheduledReason}</p>
    )
  },
  {
    accessorKey: 'rescheduledDate',
    header: 'Rescheduled Date',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1 items-start">
          <div className="flex items-center space-x-2">
            <p>{moment(row.original.rescheduledDate).format('ll')}</p>
            <span className="text-[10px] text-slate-400 ">|</span>
            <span className="text-[12px] text-slate-500 ">
              {calculateTimeDuration(row.original.rescheduledDate)}
            </span>{' '}
          </div>
          <Badge className="text-[12px] rounded-full shadow-none bg-slate-200 hover:bg-slate-100 text-slate-500 ">
            {
              days.map((item) => item.day)[
                new Date(
                  row.original.rescheduledDate as unknown as Date
                ).getDay()
              ]
            }
          </Badge>
        </div>
      )
    }
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <Link href={`/notify/${row.original.id}`}>Edit </Link>
  }
]

//

export const pinnedColumns: Array<ColumnDef<ExtendedAppointmentInputProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 text-[12px] ">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <Link
          className="capitalize text-blue-500 text-[12px] hover:underline hover:cursor-pointer "
          href={`/users/patients/tab/dashboard/${row.original.patientID}`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
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
    accessorKey: 'appointmentAgenda',
    header: 'Agenda',
    cell: ({ row }) => (
      <p className="capitalize text-[12px] ">{`${row.original.AppointmentAgenda?.agendaDescription}`}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'Status',
    cell: ({ row }) => {
      const appointmentStatus =
        row.original.AppointmentStatus?.statusDescription
      if (appointmentStatus === ('Missed' as string)) {
        return (
          <Badge
            // colorScheme="red"
            // rounded={'full'}
            className="rounded-full bg-red-50 text-red-500 shadow-none"
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Upcoming') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
            className="rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50 shadow-none text-[12px] "
          >
            {appointmentStatus}
          </Badge>
        )
      } else if (appointmentStatus === 'Completed') {
        return (
          <Badge
            // colorScheme="blue"
            // rounded={'full'}
            className="rounded-full bg-emerald-50 text-emerald-500 hover:bg-emerald-50 shadow-none"
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
    accessorKey: 'appointmentDate',
    header: 'Date',
    cell: ({ row }) => (
      <div className="flex flex-row text-[12px] ">
        <p>{moment(row.original.appointmentDate).format('ll')}</p>,{' '}
      </div>
    )
  }
]
