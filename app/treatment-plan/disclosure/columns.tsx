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
import { type ExtendedDisclosureTracker } from '@/api/treatmentplan/disclosureTracker.api'
import Progress from '@/components/Progress'
//

export const fullDisclosureColumn: Array<
ColumnDef<ExtendedDisclosureTracker>
> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div>
          <div
            className="flex flex-row gap-x-2 items-center
      text-[12px]
      "
          >
            <Avatar
              name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
            />
            <Link
              className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
              href={`/users/patients/tab/dashboard/${row.original?.patientID}`}
            >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
          </div>
          <div
          className='flex flex-row space-x-2 items-center text-center ml-7 text-[12px] text-slate-500 font-semibold'
          >
            <p>{row.original.Patient?.sex}</p> <p>~</p>
            <p>{calculateAge(row.original.Patient?.dob)} yrs</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => {
      const score = row.original?.FullDisclosure?.score
      return (
        <>
        {score
          ? <p className="text-[12px] text-slate-500">{score} of 23</p>
          : <Badge
          className='rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 shadow-none'
          >None</Badge>
      }
        </>
      )
    }
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const score = row.original?.FullDisclosure?.score

      const percentage = score && Math.floor(score / 23 * 100)
      return (
        percentage && (

            <Progress percentage={percentage} />
        )
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">
        {moment(row.original.updatedAt).format('ll')}
      </p>
    )
  }

]
//

export const partialDisclosureColumn: Array<ColumnDef<ExtendedDisclosureTracker>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div>
          <div
            className="flex flex-row gap-x-2 items-center
      text-[12px]
      "
          >
            <Avatar
              name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
            />
            <Link
              className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
              href={`/users/patients/tab/dashboard/${row.original?.patientID}`}
            >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
          </div>
          <div className="flex flex-row space-x-2 items-center text-center ml-7 text-[12px] text-slate-500 font-semibold">
            <p>{row.original.Patient?.sex}</p> <p>~</p>
            <p>{calculateAge(row.original.Patient?.dob)} yrs</p>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'PartialDisclosure.score',
    header: 'Score',
    cell: ({ row }) => {
      const score = row.original?.PartialDisclosure?.score
      return (
        <>
          {score ? (
            <p className="text-[12px] text-slate-500">
              {score} of 13
            </p>
          ) : (
            <Badge className="rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 shadow-none">
              None
            </Badge>
          )}
        </>
      )
    }
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const score = row.original?.PartialDisclosure?.score

      const percentage = score && Math.floor((score / 23) * 100)
      return percentage && <Progress percentage={percentage} />
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">
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
