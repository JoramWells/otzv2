/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment/moment'
import Link from 'next/link'
import { calculateAge } from '@/utils/calculateAge'
import { Badge } from '@/components/ui/badge'
import { type PatientProps } from '@/types'
import Avatar from '@/components/Avatar'
import { type ExtendedOTZEnrollment } from '@/api/enrollment/otzEnrollment.api'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export const columns: Array<ColumnDef<ExtendedOTZEnrollment>> = [
  {
    accessorKey: 'patient_name',
    header: 'Patient Name',
    cell: ({ row }) => {
      const { firstName, middleName } = row.original.Patient
      return (
        <div className="flex flex-row items-center gap-x-2">
          <Avatar
            // size={'sm'}
            // className="font-bold"
            name={`${firstName} ${middleName}`}
          />
          <p className="capitalize text-[12px] font-semibold">{`${firstName} ${middleName}`}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'sex',
    header: 'Sex',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">{row.original.Patient?.sex}</p>
    )
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => (
      <p className="text-[12px]">{calculateAge(row.original.Patient.dob)}</p>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'dateOfEnrollmentToOTZ',
    header: 'Enrollment Date',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {moment(row.getValue('dateOfEnrollmentToOTZ')).format('ll')}
      </p>
    )
  },
  {
    accessorKey: 'Action',
    header: '',
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <ArrowRight
          size={18}
          className="hover:cursor-pointer hover:text-slate-500 text-slate-400 "
          onClick={() => {
            router.push(
              `/users/otz/${row.original.id}`
            )
          }}
        />
      )
    }
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
          // size={'xs'}
          // className="font-bold"
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
