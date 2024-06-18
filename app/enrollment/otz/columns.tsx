/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment/moment'
import { Avatar, Tag } from '@chakra-ui/react'
import Link from 'next/link'
import { calculateAge } from '@/utils/calculateAge'
import { Badge } from '@/components/ui/badge'
import { type PatientProps } from '@/types'

// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  currentRegimenLine: string
  currentARTRegimen: string
  isValid: string
  artRegimenPhase: any
  art: any
  Patient: {
    firstName: string
    middleName: string
  }
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient_name',
    header: 'Patient Name',
    cell: ({ row }) => {
      const { firstName, middleName } = row.original.Patient
      return (
        <div className="flex flex-row items-center gap-x-2">
          <Avatar
            size={'sm'}
            className="font-bold"
            name={`${firstName} ${middleName}`}
          />
          <p className="capitalize">{`${firstName} ${middleName}`}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'dateOfEnrollmentToOTZ',
    header: 'Enrollment Date',
    cell: ({ row }) => (
      <p>{moment(row.getValue('dateOfEnrollmentToOTZ')).format('ll')}</p>
    )
  },
  {
    accessorKey: 'dateOfVL',
    header: 'Date Of VL',
    cell: ({ row }) => <p>{moment(row.getValue('dateOfVL')).format('ll')}</p>
  },
  {
    accessorKey: 'isValid',
    header: 'VL VALID',
    cell: ({ row }) => (
      <div>
        {row.original.isValid === 'Valid'
          ? (
          <Tag colorScheme="green" size={'sm'}>
            Valid
          </Tag>
            )
          : (
          <Tag colorScheme="red" size={'sm'}>
            Invalid
          </Tag>
            )}
      </div>
    )
  },
  {
    accessorKey: 'vlResults',
    header: 'VL results'
  },
  {
    accessorKey: 'currentRegimenLine',
    header: 'Regimen Details',
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <p>{row.original.currentRegimenLine}</p>
        <p className="text-slate-500">{row.original.currentARTRegimen}</p>
        {/* <p
        className='text-xs'
        >{moment(new Date(row.original.currentARTStartDate)).format('ll')}</p> */}
      </div>
    )
  }
]

//
export const patientColumns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          size={'xs'}
          className="font-bold"
          name={`${row.original?.firstName} ${row.original?.middleName}`}
        />
        <Link
          className="capitalize  text-blue-500 text-[14px] hover:cursor-pointer hover:underline "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p>{calculateAge(row.original?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div>
        {row.original.phoneNo
          ? (
              row.original.phoneNo
            )
          : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500 text-[12px]
      "
          >
            Update
          </Badge>
            )}
      </div>
    )
  },
  {
    accessorKey: 'cccNo',
    header: 'CCC No.'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'populationType',
    header: 'Population Type'
  },
  // {
  //   accessorKey: 'entryPoint',
  //   header: 'Entry Point'
  // },
  {
    accessorKey: 'createdAt',
    header: 'Date of Enrollment',
    cell: ({ row }) => <p>{moment(row.original.createdAt).format('ll')}</p>
  }
]
