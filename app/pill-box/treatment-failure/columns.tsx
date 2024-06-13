/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'

import Avatar from '@/components/Avatar'
import { calculateAdherence } from '@/utils/calculateAdherence'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { CalendarDays } from 'lucide-react'
import { useCallback } from 'react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface PrescriptionProps {
  frequency: number
  computedNoOfPills: number
  expectedNoOfPills: number
  noOfPills: number
  ART: {
    artName: string
  }
  refillDate: MomentInput | string
  nextRefillDate: MomentInput
  appointmentTime: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  createdAt: Date
  user: any
  Patient: any
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
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

export const columns: Array<ColumnDef<PrescriptionProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 ">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
          <p className="capitalize font-semibold">{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'currentARTRegimen',
    header: 'Regimen',
    cell: ({ row }) => <p>{row.original.ART?.artName}</p>
  },
  {
    accessorKey: 'frequency',
    header: 'FREQUENCY',
    cell: ({ row }) => (
      <p className="text-slate-500 font-bold">x{row.original.frequency} </p>
    )
  },
  {
    accessorKey: 'noOfPills',
    header: 'Prescribed'
  },
  {
    accessorKey: 'expectedNoOfPills',
    header: 'Remaining Pills'
  },
  {
    accessorKey: 'computedNoOfPills',
    header: 'Dispensed'
  },
  {
    accessorKey: 'adherence',
    header: 'Adherence (%)',
    cell: ({ row }) => {
      const { refillDate, computedNoOfPills, frequency } = row.original
      const adherence = calculateAdherence(refillDate, computedNoOfPills, frequency)
      return (
        <p
        className='text-slate-500'
        >{adherence} %</p>
      )
    }
  },
  {
    accessorKey: 'refillDate',
    header: 'Refill Date',
    cell: ({ row }) => {
      const { refillDate } = row.original
      const duration = useCallback(() => {
        return calculateTimeDuration(refillDate)
      }, [refillDate])()
      return (
        <div className='flex items-start space-x-1'>
          <CalendarDays className='' size={15} />
          <div>
            <p>{moment(row.original.refillDate).format('ll')}</p>
            <small className="font-bold text-slate-500">
              {duration}
            </small>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'nextRefillDate',
    header: 'Next Refill Date',
    cell: ({ row }) => {
      const { nextRefillDate } = row.original
      const duration = useCallback(() => {
        return calculateTimeDuration(nextRefillDate)
      }, [nextRefillDate])()
      return (
        <div className="flex items-start space-x-1">
          <CalendarDays className="" size={15} />
          <div>
            <p>{moment(row.original.nextRefillDate).format('ll')}</p>
            <small className="font-bold text-slate-500">{duration}</small>
          </div>
        </div>
      )
    }
  }
]
