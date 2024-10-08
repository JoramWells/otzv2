/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import { type PatientProps } from '@/types'
import { calculateAge } from '@/utils/calculateAge'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1.5 pb-1.5 text-[12px]
      "
      >
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${row.original?.firstName} ${row.original?.middleName}`}
        />
        <Link
          className="capitalize font-bold text-slate-700 underline"
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex',
    cell: ({ row }) => <p
    className='text-[12px]'
    >{row.original.sex}</p>
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p>{calculateAge(row.original?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div>
        {row.original.phoneNo
          ? (
              row.original.phoneNo
            )
          : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500
      "
          >
            Update
          </Badge>
            )}
      </div>
    )
  },
  {
    accessorKey: 'cccNo',
    header: 'CCC No.'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'populationType',
    header: 'Population Type'
  }
]
