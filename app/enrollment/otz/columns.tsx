import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import moment from 'moment/moment'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  artRegimenPhase: any
  art: any
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient?: FullNameProps
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
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}
        />
        <p className="capitalize font-semibold">{`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'art',
    header: 'ART NAME',
    cell: ({ row }) => <p>{row.original.art?.artName}</p>
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
    header: 'VL VALID'
  },
  {
    accessorKey: 'vlCopies',
    header: 'VL results'
  },
  {
    accessorKey: 'artRegimenPhase',
    header: 'Regimen Line',
    cell: ({ row }) => (
      <p>{row.original.artRegimenPhase.artPhaseDescription}</p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/enrollment/otz/${row.original.id}`}>See Patient</Link>
    )
  }
]
