/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import { type ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

interface PatientProps {
  id: any
  User: {
    firstName?: string
    middleName?: string
  }
  AppointmentAgenda: {
    agendaDescription?: string
  }
  AppointmentStatus: {
    statusDescription?: string
  }
  appointmentDate: MomentInput
}

export const columns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Requested By',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700"
        href={`/patients/${row.original.id}`}
      >{`${row.original.User?.firstName} ${row.original.User?.middleName}`}</Link>
    )
  },
  {
    accessorKey: 'appointmentAgenda',
    header: 'Agenda',
    cell: ({ row }) => (
      <p>{row.original.AppointmentAgenda?.agendaDescription}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.AppointmentStatus?.statusDescription
      return (
        <div>
          {status === 'Pending' && (
            <Badge className="shadow-none rounded-full bg-orange-50 text-orange-500 hover:bg-orange-50">
              {status}
            </Badge>
          )}

          {status === 'Upcoming' && (
            <Badge className="shadow-none rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50">
              {status}
            </Badge>
          )}

          {status === 'Completed' && (
            <Badge className="shadow-none rounded-full bg-teal-50 text-teal-500 hover:bg-teal-50">
              {status}
            </Badge>
          )}

          {status === 'Cancelled' && (
            <Badge className="shadow-none rounded-full bg-red-50 text-red-500 hover:bg-red-50">
              {status}
            </Badge>
          )}

          {status === 'Rescheduled' && (
            <Badge className="shadow-none rounded-full bg-teal-50 text-teal-500 hover:bg-teal-50">
              {status}
            </Badge>
          )}

        </div>
      )
    },
    enableSorting: true
  },

  {
    accessorKey: 'appointmentDate',
    header: 'Date',
    cell: ({ row }) => (
      <p>{moment(row.original.appointmentDate).format('LL')}</p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

interface CaregiverColumnsProps {
  id: string
  firstName?: string
  middleName?: string
  phoneNo?: string
  AppointmentStatus: {
    statusDescription?: string
  }
  appointmentDate: MomentInput
}

export const caregiverColumns: Array<ColumnDef<CaregiverColumnsProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700"
        href={`/patients/${row.original.id}`}
      >{`${row.original.firstName} ${row.original.middleName}`}</Link>
    )
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'maritalStatus',
    header: 'Marital Status'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'relationship',
    header: 'Relationship'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

interface LabTabProps {
  id: string
  firstName?: string
  middleName?: string
  phoneNo?: string
  AppointmentStatus: {
    statusDescription?: string
  }
  dateRequested: MomentInput
}

export const labTabColumns: Array<ColumnDef<LabTabProps>> = [
  {
    accessorKey: 'testName',
    header: 'Test Name'
    // cell: ({ row }) => (
    //   <Link
    //     className="capitalize font-bold text-slate-700"
    //     href={`/patients/${row.original.id}`}
    //   >{`${row.original.firstName} ${row.original.middleName}`}</Link>
    // )
  },
  {
    accessorKey: 'specimenType',
    header: 'Specimen Type'
    // cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'urgency',
    header: 'Urgency'
    // cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'dateRequested',
    header: 'Date Requested',
    cell: ({ row }) => <p>{moment(row.original.dateRequested).format('LL')}</p>
  },
  {
    accessorKey: 'results',
    header: 'results'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'reason',
    header: 'reason'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]
