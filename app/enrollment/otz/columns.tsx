import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment/moment'
import { Avatar, Button, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Menu, MoreHorizontal } from 'lucide-react'
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
    accessorKey: 'patient_name',
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
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<MoreHorizontal size={20} />}
          size={'sm'}
          rounded={'full'}
          // colorScheme="teal"
          // bgColor={'white'}
          // borderColor={'black'}
          // variant={'outline'}
        >
          Columns
        </MenuButton>
        <MenuList className="flex flex-col p-2 gap-y-3">
          {/* <MenuItem>Hello</MenuItem> */}
          H
        </MenuList>
      </Menu>
    )
  }
]
