/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment/moment'
import { Avatar } from '@chakra-ui/react'

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
    accessorKey: 'patient_name',
    header: 'Patient Name',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original.Patient?.firstName} ${props.row.original.Patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${props.row.original.Patient?.firstName} ${props.row.original.Patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (props) => (
      <p>{`${props.row.original.Patient?.dob}`}</p>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Enrollment Date',
    cell: ({ row }) => <p>{moment(row.getValue('updatedAt')).format('ll')}</p>
  },
  {
    accessorKey: 'anc',
    header: 'ANC'
  },

  {
    accessorKey: 'pncNo',
    header: 'PNC No.'
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
