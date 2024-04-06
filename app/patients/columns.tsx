/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { calculateAge } from '@/utils/calculateAge'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Dot } from 'lucide-react'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  viralLoads: any
  sex: string
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
        <div className="relative">
          <Avatar
            size={'sm'}
            className="font-bold"
            name={`${row.original?.firstName} ${row.original?.middleName}`}
          />
          {Boolean(row.original.viralLoads) &&
            row.original.viralLoads[0]?.vlResults > 1000 && (
              <div
                className="h-2 w-2 bg-red-500
          rounded-full absolute right-0 top-0 border border-white
          "
              />
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize font-bold text-slate-700"
            href={`/patients/${row.original.id}`}
          >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>

          <div className="flex flex-row text-sm text-slate-500 items-center">
            <p>{row.original?.sex}</p>
            <Dot />
            <p>{calculateAge(row.original.dob)} years</p>
            {/* <p>{row.original.phoneNo}</p> */}
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'dateConfirmedPositive',
    header: 'date'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'ageAtReporting',
    header: 'date'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'populationType',
    header: 'Population Type'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/patients/${row.original.id}`}>See Patient</Link>
    )
  }
]
