/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Avatar from '@/components/Avatar'
import { type ExtendedViralLoadInterface } from '@/api/enrollment/viralLoadTests.api'
import RowDetails from '@/components/RowDetails'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<ExtendedViralLoadInterface>> = [
  {
    accessorKey: 'patient',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2 text-[12px] items-center">
        <Avatar
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original.patientID}`}
          >{`${row.original.Patient.firstName} ${row.original.Patient.middleName}`}</Link>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'vlResults',
    header: 'Viral Load',
    cell: ({ row }) => (
      <p className="text-slate-500 text-[12px] ">{row.original.vlResults}</p>
    )
  },
  {
    accessorKey: 'vlJustification',
    header: 'Justification',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original.vlJustification}</p>
    )
  },
  {
    accessorKey: 'dateOfVL',
    header: 'Date',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {' '}
        {moment(row.original.dateOfVL).format('ll')}{' '}
      </p>
    )
  },
  {
    accessorKey: 'isVLValid',
    header: 'Status',
    cell: ({ row }) => (
      <>
        {row.original.isVLValid === true ? (
          <Badge className="rounded-full text-[12px] bg-teal-50 text-teal-600 shadow-none hover:bg-gray-50 ">
            Valid
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-[12px] text-red-500 shadow-none rounded-full hover:bg-red-50 ">
            Invalid
          </Badge>
        )}
      </>
    )
  }, {
    accessorKey: 'action',
    cell: ({ row }) => <RowDetails
    link={`/viratrack/viratrack/${row.original.id}`}
    />
  }
]
