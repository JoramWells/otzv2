/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { type HomeVisitAttributes } from 'otz-types'
// import { FaEdit } from 'react-icons/fa'

export type HomeVisitInputProps = HomeVisitAttributes & {
  Patient: {
    id?: string
    firstName?: string
    secondName?: string
    middleName?: string
  }
  updatedAt: string
  patientID: string
  dateRequested: string
  HomeVisitReason: {
    id?: string
    homeVisitReasonDescription?: string
  }
  HomeVisitFrequency: {
    id?: string
    homeVisitFrequencyDescription?: string
  }
}

export const columns: Array<ColumnDef<HomeVisitInputProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 pt-4 pb-4 lg:pt-2 lg:pb-2 xl:pt-0 xl:pb-0 xxl:pt-0 xxl:pb-0">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'noOfPills',
    header: 'No. Of Pills'
    // cell: ({ row }) => <p>{row.original.ART?.artName}</p>
  },
  {
    accessorKey: 'medicineStatus',
    header: 'Status'
  },
  {
    accessorKey: 'actionTaken',
    header: 'Action Taken'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Date',
    cell: ({ row }) => (
      <div>
        <p>{moment(row.original.updatedAt).format('ll')}</p>
      </div>
    )
  },
  {
    accessorKey: 'returnToClinic',
    header: 'Return To Clinic',
    cell: ({ row }) => (
      <p>{moment(row.original.returnToClinic).format('ll')}</p>
    )
  },
  {
    accessorKey: 'Action',

    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/home-visit/${row.original.id}?patientID=${row.original.patientID}`}>Action</Link>
    )
  }
]
