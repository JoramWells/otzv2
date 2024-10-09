/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { Trash2, Pencil, Loader2 } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import { useDeleteAppointmentAgendaMutation } from '@/api/appointment/appointmentAgenda.api'
import { type AppointmentAgendaAttributes } from 'otz-types'
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

export const columns: Array<ColumnDef<AppointmentAgendaAttributes>> = [
  {
    accessorKey: 'agendaDescription',
    header: 'Agenda Description',
    cell: ({ row }) => <p
    className='text-[12px]'
    >
      {row.original?.agendaDescription}
    </p>
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (<p
    className='text-[12px]'
    >{moment(row.original.updatedAt).format('ll')} </p>)
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      const [deleteAppointmentAgenda, { isLoading }] = useDeleteAppointmentAgendaMutation()
      return (
        <div className="flex flex-row gap-x-2">
          <Pencil
            className="bg-blue-100 text-blue-500 p-1 hover:cursor-pointer hover:text-blue-700 rounded-md"
            size={24}
          />
          {isLoading
            ? (
            <Loader2 className='animate-spin' size={24} />
              )
            : (
            <Trash2
              className="bg-red-100 text-red-500 p-1 hover:cursor-pointer hover:text-red-700 rounded-md"
              size={24}
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
    accessorKey: 'color',
    header: 'Color'
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
