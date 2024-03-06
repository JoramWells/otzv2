import { Avatar, Tag } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { View } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
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
    accessorKey: 'patient_name',
    header: 'Patient Name',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={'sm'}
          className="font-bold"
          name={`${props.row.original?.firstName} ${props.row.original?.middleName}`}
        />
        <p className="capitalize font-semibold">{`${props.row.original?.firstName} ${props.row.original?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'dob',
    header: 'DOB'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'mflCode',
    header: 'MFL code'
  },
  {
    accessorKey: 'occupation',
    header: 'Occupation'
  },
  {
    header: 'Enrollment',
    cell: () => (
      <div className="flex flex-row space-x-2">
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          OTZ
        </Tag>
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          OVC
        </Tag>
        <Tag size={'sm'} fontWeight={'bold'} color={'slategrey'}>
          PAMA
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
    cell: () => (
      <div>
        <View className="hover:cursor-pointer" size={20} />
      </div>
    )
  }
]
