/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

import Avatar from '@/components/Avatar'
import { type ExtendedTimeAndWorkInterface } from '@/api/treatmentplan/timeAndWork.api'
//

export const recentTimeAndWorkColumn: Array<ColumnDef<ExtendedTimeAndWorkInterface>> =
  [
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
      accessorKey: 'wakeUpTime',
      header: 'Wakes Up',
      cell: ({ row }) => (
        <p className="text-[12px]">{row.original?.wakeUpTime}</p>
      )
    },

    {
      accessorKey: 'morningMedicineTime',
      header: 'Morning Medicine',
      cell: ({ row }) => (
        <p className="text-[12px]">{row.original?.morningMedicineTime}</p>
      )
    },
    {
      accessorKey: 'eveningMedicineTime',
      header: 'Evening Medicine',
      cell: ({ row }) => (
        <p className="text-[12px]">{row.original?.eveningMedicineTime}</p>
      )
    },
    {
      accessorKey: 'toolsAndCues',
      header: 'Tools',
      cell: ({ row }) => (
        <p className="text-[12px]">{row.original?.toolsAndCues}</p>
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
