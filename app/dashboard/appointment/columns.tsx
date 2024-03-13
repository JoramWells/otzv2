import { Trash2, Pencil } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
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
