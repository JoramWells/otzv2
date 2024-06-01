/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

interface AppointmentProps {
  updatedAt: MomentInput
  id: any
  User: {
    firstName?: string
    middleName?: string
  }
  AppointmentAgenda: {
    agendaDescription?: string
  }
  patientID: string
  appointmentDate: MomentInput
}

export const columns: Array<ColumnDef<AppointmentProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Requested By',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700"
        href={`/users/patients/tab/visit-detail/${row.original.patientID}?visitID=${row.original.id}`}
      >{`${row.original.User?.firstName} ${row.original.User?.middleName}`}</Link>
    )
  },

  {
    accessorKey: 'clinicalNotes',
    header: 'Clinical Notes'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'updatedAt',
    header: 'DATE',
    cell: ({ row }) => <p>{moment(row.original.updatedAt).format('ll')}</p>
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
