import { type ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

interface ColumnProps {
  header: string
  accessorKey?: keyof CountyProps
  // render?: (props: any) => React.ReactNode
}

interface SubCountyColumnProps {
  header: string
  accessorKey?: keyof SubCountyProps
  // render?: (props: any) => React.ReactNode
}

export interface CountyProps {
  id: string
  occupationDescription?: number
  updatedAt?: string

  // action?: React.ReactNode
}

export interface SubCountyProps {
  id: string
  countyID?: number
  subCountyName?: string

  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'countyName',
    header: 'County Name'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
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

export const subCountyColumns: Array<ColumnDef<SubCountyColumnProps>> = [
  {
    accessorKey: 'county',
    header: 'County Name',
    cell: ({ row }) => <p>{row.getValue('county')?.countyName}</p>
  },
  {
    accessorKey: 'subCountyName',
    header: 'Sub County Name'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
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
