/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { calculateAge } from '@/utils/calculateAge'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Ellipsis, TrashIcon } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type ExtendedImportantPatientInterface, useAddImportantPatientMutation } from '@/api/patient/importantPatients.api'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/Avatar'
import { type ExtendedPartialDisclosureInterface } from '@/api/treatmentplan/partial/partialDisclosure.api'
//
interface CaregiverColumnsProps {
  id: string
  firstName?: string
  middleName?: string
  phoneNo?: string
  AppointmentStatus: {
    statusDescription?: string
  }
  appointmentDate: MomentInput
}

export const caregiverColumns: Array<ColumnDef<CaregiverColumnsProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700"
        href={`/patients/${row.original.id}`}
      >{`${row.original.firstName} ${row.original.middleName}`}</Link>
    )
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'maritalStatus',
    header: 'Marital Status'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'relationship',
    header: 'Relationship'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

export const partialDisclosureColumn: Array<ColumnDef<ExtendedPartialDisclosureInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >

            <Avatar
              name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
            />
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${row.original?.Patient?.id}`}
          >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.score}</p>
  },

  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <p className="text-[12px]">{moment(row.original.updatedAt).format('ll')}</p>
  },

  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      // const patientID = row.original.id

      const { data: session } = useSession()
      return (
        <div className="flex flex-row space-x-2 items-center">
          {/* <PinnedCell patientID={patientID} /> */}
          <DropDownComponent id={row.original.id!} userID={session?.user.id} />
        </div>
      )
    }
  }
]

const DropDownComponent = ({ id, userID }: { id: string, userID?: string }) => {
  const [addImportantPatient] = useAddImportantPatientMutation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="hover:cursor-pointer text-slate-500" size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Upcoming Appointments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onClick={async () =>
            await addImportantPatient({
              patientID: id,
              userID
            })
          }
        >
          <p>Pin</p>

          {/* <div className="flex justify-between items-center w-full">
            {isImportant ? (
              <p className="text-yellow-500">Unpin</p>
            ) : (
              <p>Pin</p>
            )}
            <Pin
              size={18}
              className={`text-slate-500 ${isImportant && "text-yellow-500"} `}
            />
          </div> */}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <div className="flex justify-between items-center w-full">
            <Link href={`/users/patients/tab/settings/${id}`}>Edit</Link>
            <Edit size={18} className="text-slate-500" />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const importantPatientColumn: Array<
ColumnDef<ExtendedImportantPatientInterface>
> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
      </div>
    )
  },
  // {
  //   accessorKey: 'sex',
  //   header: 'Sex',
  //   cell: ({ row }) => <p
  //   className='text-[12px]'
  //   >{row.original.sex}</p>
  // },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p className='text-[12px]' >{calculateAge(row.original?.Patient?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div className="text-[12px]">
        {row.original?.Patient?.phoneNo ? (
          row.original?.Patient?.phoneNo
        ) : (
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
    accessorKey: 'visits',
    header: 'Visits',
    cell: ({ row }) => (
      <div>
        <p className="text-[12px] text-slate-500">
          Count: <span>{row.original?.count}</span>
        </p>
        <p className='text-[12px] text-slate-500' >{moment(row.original?.createdAt).format('ll')}</p>
      </div>
    )
  }
]
