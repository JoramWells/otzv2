/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment/moment'
import { Avatar, Tag } from '@chakra-ui/react'
import { MoreHorizontal, MoreHorizontalIcon } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
          name={`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${props.row.original.patient?.firstName} ${props.row.original.patient?.middleName}`}</p>
          <p className="uppercase text-slate-500 font-sm mt-1">
            {`${props.row.original.patient?.sex === 'M' ? 'Male' : 'Female'}`} .{' '}
            {moment().diff(
              moment(new Date(props.row.original.patient?.dob)).format('ll'),
              'years'
            )}{' '}
            yrs
          </p>
        </div>
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
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal
            size={20}
            className="hover:cursor-pointer text-slate-500 hover: hover:text-slate-600"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>Enrollment Details</DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  {/* <Button variant="outline">Edit Profile</Button> */}
                  <MoreHorizontalIcon />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you
                      done.
                    </DialogDescription>

                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
