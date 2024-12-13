/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { calculateAge } from '@/utils/calculateAge'
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

import { type ExtendedImportantPatientInterface } from '@/api/patient/importantPatients.api'
import Avatar from '@/components/Avatar'
import { type ExtendedMMASFourInterface } from '@/api/treatmentplan/mmasFour.api'

export const columns: Array<ColumnDef<ExtendedMMASFourInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          <Avatar
            name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
          />
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original?.Patient?.id}`}
          >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'isCareless',
    header: 'Careless',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.isCareless ? 'Careless' : 'Not Careless'}</p>
    )
  },

  {
    accessorKey: 'isForget',
    header: 'Forgets',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.isForget ? 'Forgets' : 'Doesnot'}</p>
    )
  },
  {
    accessorKey: 'isQuitFeelWorse',
    header: 'Feels Worse When Quits',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.isQuitFeelWorse ? 'True' : 'False'}</p>
    )
  },
  {
    accessorKey: 'isQuitFeelBetter',
    header: 'Feels Better When Quits',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.isQuitFeelBetter ? 'True' : 'False'}</p>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.original.updatedAt).format('ll')}
      </p>
    )
  }

]

export const importantPatientColumn: Array<
ColumnDef<ExtendedImportantPatientInterface>
> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
      </div>
    )
  },
  // {
  //   accessorKey: 'sex',
  //   header: 'Sex',
  //   cell: ({ row }) => <p
  //   className='text-[12px]'
  //   >{row.original.sex}</p>
  // },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p className='text-[12px]' >{calculateAge(row.original?.Patient?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div className="text-[12px]">
        {row.original?.Patient?.phoneNo ? (
          row.original?.Patient?.phoneNo
        ) : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500 text-[12px]
      "
          >
            Update
          </Badge>
        )}
      </div>
    )
  },
  {
    accessorKey: 'visits',
    header: 'Visits',
    cell: ({ row }) => (
      <div>
        <p className="text-[12px] text-slate-500">
          Count: <span>{row.original?.count}</span>
        </p>
        <p className='text-[12px] text-slate-500' >{moment(row.original?.createdAt).format('ll')}</p>
      </div>
    )
  }
]
