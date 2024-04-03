/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { calculateAge } from '@/utils/calculateAge'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { Avatar, Tag } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Dot } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  viralLoads: any
  sex: string
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
    accessorKey: 'dateOfNextVL',
    header: 'Next VL',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          {row.original.viralLoads?.map((item: any) => (
            <>
              <p>{moment(item.dateOfNextVL).format('ll')}</p>
              <p className="text-slate-500 text-sm">
                {calculateTimeDuration(item.dateOfNextVL)}
              </p>
            </>
          ))}
          {/*  */}
        </div>
      )
    }
  },
  {
    accessorKey: 'viralLoads',
    header: 'VL Status',
    cell: ({ row }) => (
      <>
        {row.original.viralLoads?.map((item: any) => (
          <div
            key={item.id}
            className={`flex flex-col space-y-1 bg-slate-50  
          rounded-lg p-2 
          `}
          >
            <div className="flex flex-row justify-between items-center">
              <p>Results:</p>
              <p>{item.vlResults}</p>
            </div>

            {/*  */}
            <div className="flex flex-row justify-between items-center">
              <p>Date:</p>
              <p>{moment(item.dateOfCurrentVL).format('ll')}</p>
            </div>

            {/*  */}
            <div className="flex flex-row justify-between items-center">
              <p>Status:</p>
              {item.isValid === 'Valid'
                ? (
                <Tag colorScheme="teal" size={'sm'} variant={'outline'}>
                  Valid
                </Tag>
                  )
                : (
                <Tag size={'sm'} variant={'outline'}>
                  Invalid
                </Tag>
                  )}
            </div>
          </div>
        ))}
      </>
    )
  },
  {
    accessorKey: 'school',
    header: 'School',
    cell: ({ row }) => <p>{row.original.school?.schoolName}</p>
  },
  {
    header: 'Enrollment',
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <Tag
          size={'sm'}
          fontWeight={'bold'}
          color={'slategrey'}
          _hover={{
            cursor: 'pointer'
          }}
        >
          <Link href={`/enrollment/enroll-otz/${row.original.id}`}>OTZ</Link>
        </Tag>
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          OVC
        </Tag>
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          <Link href={`/enrollment/enroll-pama/${row.original.id}`}>PAMA</Link>
        </Tag>
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          PMTCT
        </Tag>
      </div>
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
