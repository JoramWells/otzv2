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
    cell: ({ row }) => (
      <div>
        <Badge>{row.original.AppointmentStatus?.statusDescription}</Badge>
      </div>
    ),
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
