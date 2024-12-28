/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Button } from '@/components/ui/button'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

import { type TransferInInterface, type TransferOutInterface } from 'otz-types'
import Avatar from '@/components/Avatar'
import moment from 'moment'
import { CalendarX2Icon } from 'lucide-react'
//

export const transferOutColumns: Array<ColumnDef<TransferOutInterface>> = [
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
            name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
          />
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original.patientID}`}
          >{`${
            row.original.Patient?.firstName
          } ${row.original.Patient?.middleName?.charAt(1)}.`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'transferOutVerificationDate',
    header: 'Verified',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {row.original.transferOutVerificationDate ? 'Verified' : 'Not Verified'}
      </p>
    )
  },
  // {
  //   accessorKey: "verified",
  //   header: "Verified",
  //   cell: ({ row }) => (
  //     <p className="text-[12px]">
  //       {row.original.transferOutVerificationDate ? "Verified" : "Not Verified"}
  //     </p>
  //   ),
  // },
  {
    accessorKey: 'lastAppointmentDate',
    header: 'Last Appointment Date',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.original.lastAppointmentDate).format('ll')}
      </p>
    ),
    enableSorting: true,
    sortingFn: 'basic'
  },
  {
    accessorKey: 'lastVisitDate',
    header: 'Last Visit Date',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.original?.lastVisitDate).format('ll')}
      </p>
    ),
    enableSorting: true,
    sortingFn: 'datetime'
  },
  {
    accessorKey: 'transferOutDate',
    header: 'Transfer Out Date',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.original?.transferOutDate).format('ll')}
      </p>
    ),
    enableSorting: true,
    sortingFn: 'datetime'
  },
  {
    accessorKey: 'Hospital.hospitalName',
    header: 'Transferred To',
    cell: ({ row }) => <p>{row.original.Hospital?.hospitalName}</p>
  }
]

//
export const transferInColumns: Array<ColumnDef<TransferInInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Verified By',
    cell: ({ row }) => {
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          <Avatar
            name={`${row.original.TransferOut?.User?.firstName} ${row.original.TransferOut?.User?.middleName}`}
          />
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original.TransferOut?.User?.id}`}
          >{`${
            row.original.TransferOut?.User?.firstName
          } ${row.original.TransferOut?.User?.middleName?.charAt(1)}.`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'transferInVerified',
    header: 'Verified',
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex flex-row space-x-2 items-center text-[12px]">
            <p>Status:</p>
            <p>
              {row.original.transferInVerified ? 'Verified' : 'Not Verified'}
            </p>
          </div>
          <div className="flex flex-row space-x-2 items-center text-[12px]">
            <p>Date</p>
{row.original.transferInVerificationDate
  ? <p>
              {moment(row.original.transferInVerificationDate).format('ll')}
            </p>
  : <CalendarX2Icon size={14} />
}
          </div>
        </div>
      )
    }
  },
  // {
  //   accessorKey: "verified",
  //   header: "Verified",
  //   cell: ({ row }) => (
  //     <p className="text-[12px]">
  //       {row.original.transferOutVerificationDate ? "Verified" : "Not Verified"}
  //     </p>
  //   ),
  // },
  {
    accessorKey: 'TransferOut.User.firstName',
    header: 'Contact',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {`${row.original.TransferOut?.User?.firstName} ${row.original.TransferOut?.User?.middleName}`}
      </p>
    ),
    enableSorting: true,
    sortingFn: 'basic'
  },
  {
    accessorKey: 'TransferOut.User.Hospital.hospitalName',
    header: 'From',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {row.original?.TransferOut?.User?.Hospital?.hospitalName}
      </p>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'createdAt',
    header: 'Modified',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.original?.createdAt).format('ll')}
      </p>
    ),
    enableSorting: true,
    sortingFn: 'datetime'
  }
  // {
  //   accessorKey: 'Hospital.hospitalName',
  //   header: 'Transferred To',
  //   cell: ({ row }) => <p>{row.original.Hospital?.hospitalName}</p>
  // }
]
