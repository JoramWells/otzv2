/* eslint-disable react-hooks/rules-of-hooks */
import Avatar from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { type UserInterface } from 'otz-types'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

export interface UserProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
  gender?: string
  email?: string
  phone_no?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<UserInterface>> = [
  {
    accessorKey: 'patient_name',
    header: 'Name',
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          // size={'sm'}
          // className="font-bold"

          name={`${props.row.original?.firstName} ${props.row.original?.middleName}`}
        />
        <p className="capitalize font-semibold text-[12px] ">{`${props.row.original?.firstName} ${props.row.original?.middleName}`}</p>
      </div>
    )
  },
  {
    accessorKey: 'dob',
    header: 'DOB',
    cell: ({ row }) => {
      return (
        <p className="text-[12px]">{moment(row.original.dob).format('ll')}</p>
      )
    }
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.original.sex}</p>
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.original.email}</p>
    }
  },
  {
    accessorKey: 'phone_no',
    header: 'Phone No.',
    cell: ({ row }) => {
      return <p className="text-[12px]">{row.original.phoneNo}</p>
    }
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <Button
          size={'sm'}
          variant={'outline'}
          className="shadow-none rounded-full h-8 w-8 p-0"
          onClick={() => { router.push(`/administrator/users/${row.original.id}`) }}
        >
          <ArrowRight
            className="hover:cursor-pointer text-slate-500"
            size={16}
          />
        </Button>
      )
    }
  }
]
