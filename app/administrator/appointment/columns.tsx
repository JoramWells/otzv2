/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { Trash2, Pencil, Loader2 } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import { useDeleteAppointmentAgendaMutation } from '@/api/appointment/appointmentAgenda.api'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  id: any
  header: string
  updatedAt: MomentInput
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'agendaDescription',
    header: 'Agenda Description'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (<p>{moment(row.original.updatedAt).format('ll')} </p>)
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      const [deleteAppointmentAgenda, { isLoading }] = useDeleteAppointmentAgendaMutation()
      return (
        <div className="flex flex-row gap-x-2">
          <Pencil
            className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
            size={25}
          />
          {isLoading
            ? (
            <Loader2 className='animate-spin' />
              )
            : (
            <Trash2
              className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
              size={25}
              onClick={async () => await deleteAppointmentAgenda(row.original.id)}
            />
              )}
        </div>
      )
    }
  }
]

export const appointmentStatusColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'statusDescription',
    header: 'Status Description'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At'
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex flex-row gap-x-2">
        <Pencil
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
        <Trash2
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
      </div>
    )
  }
]
