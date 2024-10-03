/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import Avatar from '@/components/Avatar'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { useCallback } from 'react'
import Link from 'next/link'
import { type PrescriptionInterface } from 'otz-types'
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
    accessorKey: 'patient',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 text-[12px] ">
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
    cell: ({ row }) => <p className='text-[12px]' >{row.original.ARTPrescription?.regimen}</p>
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => (
      <p className="text-slate-500 text-[12px]">x{row.original.frequency} </p>
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
      const isFinished = (expectedNoOfPills != null) ? expectedNoOfPills < 0 : true
      return (
      <p className={`text-[12px] ${isFinished && 'text-red-500'}`}>{expectedNoOfPills}</p>
      )
    }
  },
  {
    accessorKey: 'computedNoOfPills',
    header: 'Taken',
    cell: ({ row }) => (
      <p className=" text-[12px]">{row.original.computedNoOfPills} </p>
    )
  },
  // {
  //   accessorKey: 'adherence',
  //   header: 'Adherence (%)',
  //   cell: ({ row }) => {
  //     const { refillDate, computedNoOfPills, frequency } = row.original
  //     const adherence = calculateAdherence(
  //       refillDate,
  //       computedNoOfPills as unknown as number,
  //       frequency
  //     )
  //     return <p className="text-slate-500 text ">{adherence} %</p>
  //   }
  // },
  {
    accessorKey: 'refillDate',
    header: 'From',
    cell: ({ row }) => {
      return (
          <p className='text-[12px]' >
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
          <p className='text-[12px]' >
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
        href={`/pill-box/prescription-detail/${row.original.patientVisitID}?patientID=${row.original?.Patient?.id} `}
        className='text-[12px] text-blue-500'
      >
        Action
      </Link>
    )
  }
]

//

export const importantPrescription: Array<
ColumnDef<PrescriptionProps & PrescriptionInterface>
> = [
  {
    accessorKey: 'patient',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 ">
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
    accessorKey: 'nextRefillDate',
    header: 'To',
    cell: ({ row }) => {
      const { nextRefillDate } = row.original
      const duration = useCallback(() => {
        return calculateTimeDuration(nextRefillDate)
      }, [nextRefillDate])()
      return (
        <div className="flex items-start space-x-1 text-[12px]">
          <p>{moment(row.original.nextRefillDate).format('ll')}, </p>
          <p className="text-slate-500">{duration}</p>
        </div>
      )
    }
  }
]
