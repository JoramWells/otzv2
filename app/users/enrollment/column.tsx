/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import { type PatientProps } from '@/types'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export const otzColumns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1.5 pb-1.5
      "
      >
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}
        />
        <Link
          className="capitalize font-bold text-slate-700"
          href={`/patients/${row.original.id}`}
        >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'dateOfEnrollmentToOTZ',
    header: 'Age',
    cell: ({ row }) => <p>{moment(row.original?.dateOfEnrollmentToOTZ).format('ll')}</p>,
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
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link
        href={`/users/${row.original.id}?tab=appointments`}
        className="text-blue-600  hover:underline"
      >
        Check In
      </Link>
    )
  }
]
