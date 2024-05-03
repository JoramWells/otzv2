/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import { type PatientProps } from '@/types/patient'
import { calculateAge } from '@/utils/calculateAge'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Caregiver Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-2 pb-2
      "
      >
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${row.original?.User.firstName} ${row.original?.User.middleName}`}
        />
        <Link
          className="capitalize font-bold text-slate-700"
          href={`/patients/${row.original.id}`}
        >{`${row.original?.User.firstName} ${row.original?.User.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'dob',
    header: 'DOB',
    cell: ({ row }) => <p>{calculateAge(row.original?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div>
        {row.original?.User.phoneNo
          ? (
              row.original?.User.phoneNo
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
    accessorKey: 'maritalStatus',
    header: 'Marital Status'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div>
        {`${row.original.Patient?.firstName} ${row.original.Patient?.middleName} `}
      </div>
    )
  },
  {
    accessorKey: 'relationship',
    header: 'Relationship'
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
