import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { Ellipsis } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
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
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}
        />
        <Link
          className="capitalize"
          href={`/patients/${props.row.original.patient.id}`}
        >{`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'user',
    header: 'Requested By',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <p className="capitalize">{`${props.row.original.user?.firstName} ${props.row.original.user?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'homeVisitReason',
    header: 'Reason',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <p className="capitalize">{`${props.row.original.homeVisitReason?.homeVisitReasonDescription}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'dateRequested',
    header: 'MFL code'
  },
  {
    accessorKey: 'medicineCounted',
    header: 'Medicine Counted'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div>
        {/* <Ellipsis /> */}
        more
      </div>
    )
  }
]
