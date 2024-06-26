/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Checkbox } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Trash2, Pencil } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

interface ColumnProps {
  header: string
  accessorKey?: keyof UserProps
  render?: (props: UserProps) => React.ReactNode
}

export interface UserProps {
  id?: string
  homeVisitFrequencyDescription?: string
  updatedAt?: number
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()}
    onChange={value => { row.toggleSelected(!value) }}
    aria-label='Select row'
    />
  },
  {
    accessorKey: 'homeVisitFrequencyDescription',
    header: 'Description',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.getValue('homeVisitFrequencyDescription')}
      </p>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated'
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

// reasons
export const reasonColumns: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()}
    onChange={value => { row.toggleSelected(!value) }}
    aria-label='Select row'
    />
  },
  {
    accessorKey: 'homeVisitReasonDescription',
    header: 'Description'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated'
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
