/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Dot } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
import { type ReactNode } from 'react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  dateOfNextVL: MomentInput
  isValid: ReactNode
  lastVLJustification: ReactNode
  dateOfCurrentVL: MomentInput
  vlResults: ReactNode
  patient: any
  sex: ReactNode
  dob: MomentInput
  middleName: any
  firstName: any
  school: any
  hospital: any
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row gap-x-3">
        <Avatar
          size={'xs'}
          className="font-bold"
          name={`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize"
            href={`/patients/${row.original.id}`}
          >{`${row.original.patient?.firstName} ${row.original.patient?.middleName}`}</Link>

          <div className="flex flex-row text-sm text-slate-500 items-center">
            <p>{row.original.patient?.sex}</p>
            <Dot />
            <p>{calculateAge(row.original.patient?.dob)} years</p>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'hospital',
    header: 'Current VL Status',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row justify-between">
          <p>Results</p>
          <p className="font-bold text-slate-500">{row.original.vlResults}</p>
        </div>

        {/*  */}
        <div className="flex flex-row justify-between">
          <p className="text-slate-500">Status</p>
          {row.original.isValid === 'Valid' ? (
            <Tag
              colorScheme="teal"
              // variant={'outline'}
              // rounded={'full'}
              size={'sm'}
            >
              Valid{' '}
            </Tag>
          ) : (
            <Tag
              colorScheme="red"
              size={'sm'}
              // variant={'outline'}
            >
              Invalid
            </Tag>
          )}
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-slate-500">Date</p>
          <p> {moment(row.original.dateOfCurrentVL).format('ll')} </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'lastVLJustification',
    header: 'Justification',
    cell: ({ row }) => (
      <div
      className='w-[200px]'
      >
        <p>{row.original.lastVLJustification}</p>
      </div>
    )
  },
  {
    accessorKey: 'dateOfNextVL',
    header: 'Next VL',
    cell: ({ row }) => (
      <p> {moment(row.original.dateOfNextVL).format('ll')} </p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/patients/${row.original.id}`}>See Patient</Link>
    )
  }
]
