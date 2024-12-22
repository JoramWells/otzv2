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
import { Button } from '@/components/ui/button'
import { useVerifyTransferInMutation } from '@/api/users/transfer/transferIn.api'
import { Loader2 } from 'lucide-react'
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
export const transferInColumns = (hospitalID: string, userID: string): Array<ColumnDef<TransferInInterface>> => [
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
            name={`${row.original.TransferOut?.Patient?.firstName} ${row.original.TransferOut?.Patient?.middleName}`}
          />
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original.TransferOut?.Patient?.id}`}
          >{`${
            row.original.TransferOut?.Patient?.firstName
          } ${row.original.TransferOut?.Patient?.middleName?.charAt(1)}.`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'transferInVerified',
    header: 'Verified',
    cell: ({ row }) => {
      const id = row.original.id
      const [verifyTransferIn, { isLoading }] = useVerifyTransferInMutation()
      return (
        <>
          {row.original.transferInVerified ? 'Verified' : <Button
          className='shadow-none rounded-full bg-emerald-600 hover:bg-emerald-500'
          // variant={'outline'}
          size={'sm'}
          onClick={async () => await verifyTransferIn({
            id: id as string,
            hospitalID,
            userID
          })}
          >
            {isLoading && <Loader2 className='mr-2 animate-spin' size={14} />}
            Verify
            </Button>}
        </>
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
