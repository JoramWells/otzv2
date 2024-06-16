/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Avatar from '@/components/Avatar'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export const columns: Array<ColumnDef<ViralLoadInterface>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row space-x-4 items-center pt-2 pb-2">
        <Avatar
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize"
            href={`/patients/${row.original.id}`}
          >{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</Link>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'vlResults',
    header: 'VL Results',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-4">
        <p className="font-bold text-slate-500">{row.original.vlResults}</p>
      </div>
    )
  },
  {
    accessorKey: 'vlJustification',
    header: 'Justification',
    cell: ({ row }) => (
      <div className="w-[200px]">
        <p>{row.original.vlJustification}</p>
      </div>
    )
  },
  {
    accessorKey: 'dateOfVL',
    header: 'VL Date',
    cell: ({ row }) => <p> {moment(row.original.dateOfVL).format('ll')} </p>
  },
  {
    accessorKey: 'isVLValid',
    header: 'Status',
    cell: ({ row }) => (
      <div>
        {row.original.isVLValid ? <Badge
        className='rounded-full bg-teal-100 text-teal-600 shadow-none'
        >Valid</Badge> : <Badge
        className='bg-red-50 text-red-500 shadow-none rounded-full'
        >Invalid</Badge> }
      </div>
    )
  }
]
