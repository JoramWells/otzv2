import { Trash2, Pencil } from 'lucide-react'
import { type ColumnDef } from '@tanstack/react-table'
import { Avatar, Tag } from '@chakra-ui/react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
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
    accessorKey: 'user',
    header: 'Requested By',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original.user?.firstName} ${props.row.original.user?.middleName}`}
        />
        <p className="capitalize font-semibold">{`${props.row.original.user?.firstName} ${props.row.original.user?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'appointmentDate',
    header: 'Date',
    cell: ({ row }) => <p>{`${row.original.appointmentDate}`}</p>
  },
  {
    accessorKey: 'appointmentAgenda',
    header: 'agenda',
    cell: ({ row }) => (
      <p>{`${row.original.appointmentAgenda?.agendaDescription}`}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'STATUS',
    cell: ({ row }) => (
      <Tag>{`${row.original.appointmentStatus?.statusDescription}`}</Tag>
    )
  },
  {
    // accessorKey: 'action',
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
