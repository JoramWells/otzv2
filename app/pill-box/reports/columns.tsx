/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { type PrescriptionInterface } from 'otz-types'
import { Badge } from '@/components/ui/badge'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface PatientProps {
  id?: string
  age?: number
  dob?: string
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<PrescriptionProps & PrescriptionInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center font-semibold gap-x-2 text-[12px] ">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <p className="capitalize">{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'currentARTRegimen',
    header: 'Regimen',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original.ARTPrescription?.regimen}</p>
    )
  },
  {
    accessorKey: 'noOfPills',
    header: 'Prescribed',
    cell: ({ row }) => (
      <p className=" text-[12px]">{row.original.noOfPills} </p>
    )
  },
  {
    accessorKey: 'expectedNoOfPills',
    header: 'Remaining Pills',
    cell: ({ row }) => {
      const { expectedNoOfPills } = row.original
      const isFinished =
        expectedNoOfPills != null ? expectedNoOfPills < 0 : true
      return (
        <p className={`text-[12px] ${isFinished && 'text-red-500'}`}>
          {expectedNoOfPills}
        </p>
      )
    }
  },
  {
    accessorKey: 'isCompleted',
    header: 'Completed',
    cell: ({ row }) => {
      const { isCompleted, expectedNoOfPills } = row.original
      return (
        <>
          {(isCompleted ?? false)
            ? (
            <Badge className="bg-teal-100 text-teal-600 rounded-full shadow-none hover:bg-teal-200">
              Completed
            </Badge>
              )
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            : !isCompleted && expectedNoOfPills && expectedNoOfPills > 0
                ? (
            <Badge className="bg-orange-100 text-orange-600 rounded-full shadow-none hover:bg-orange-200">
              In progress
            </Badge>
                  )
                : (
            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 rounded-full shadow-none">
              Not Completed
            </Badge>
                  )}
        </>
      )
    }
  },
  {
    accessorKey: 'refillDate',
    header: 'From',
    cell: ({ row }) => {
      return (
        <p className="text-[12px]">
          {moment(row.original.refillDate).calendar('ll')}
        </p>
      )
    }
  },
  {
    accessorKey: 'nextRefillDate',
    header: 'To',
    cell: ({ row }) => {
      return (
        <p className="text-[12px]">
          {moment(row.original.nextRefillDate).calendar()}
        </p>
      )
    }
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link
        href={`/pill-box/prescription-detail/${row.original.patientVisitID}?patientID=${row.original?.Patient?.id}&prescriptionID=${row.original.id} `}
        className="text-[12px] text-blue-500"
      >
        Action
      </Link>
    )
  }
]

//
