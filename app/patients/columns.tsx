import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Dot } from 'lucide-react'
import { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
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
        <Avatar
          size={'xs'}
          className="font-bold"
          name={`${row.original?.firstName} ${row.original?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize"
            href={`/patients/${row.original.id}`}
          >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>

          <div className="flex flex-row text-sm text-slate-500 items-center">
            <p>{row.original?.sex}</p>
            <Dot />
            <p>{calculateAge(row.original.dob)} years</p>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'ddob',
    header: 'Patient Type'
  },
  {
    accessorKey: 'sex',
    header: 'Gender'
  },
  {
    accessorKey: 'hospital',
    header: 'Hospital',
    cell: ({ row }) => <p>{row.original.hospital?.hospitalName}</p>
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
