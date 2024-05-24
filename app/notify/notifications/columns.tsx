/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
// import { FaEdit } from 'react-icons/fa'

// {
//   header: 'Name',
//   footer: props => props.column.id,
//   columns: [
//     {
//       accessorKey: 'firstName',
//       footer: props => props.column.id,
//     },
//     {
//       accessorFn: row => row.lastName,
//       id: 'lastName',
//       header: () => <span>Last Name</span>,
//       footer: props => props.column.id,
//     },
//   ],
// },

export interface FullNameProps {
  firstName?: string
}

export interface ColumnProps {
  createdAt: MomentInput
  medicineTime: MomentInput
  notifications: any
  timeAndWork: any
  refillDate: MomentInput
  appointmentTime: MomentInput
  user: any
  Patient: {
    id: string
    firstName: string
    middleName: string
  }
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
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
      <div className="flex flex-row items-center gap-x-2 pt-1 pb-1">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
        />
          <p className="capitalize font-semibold">{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</p>
      </div>
    )
  },
  // <X />
  {
    accessorKey: 'notifications',
    header: 'Notifications',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center space-x-2">
          {row.original.notifications?.push && (
            <Badge className="bg-cyan-50 text-cyan-600 shadow-none">
              Push Notification
            </Badge>
          )}
          {row.original.notifications?.sms && (
            <Badge className="bg-blue-50 text-blue-600 shadow-none">SMS</Badge>
          )}
          {row.original.notifications?.voiceCall && <Badge>Voice Call</Badge>}
          {row.original.notifications?.whatsapp && (
            <Badge
              className="bg-green-50 text-green-600 shadow-none
            hover:bg-green-50
            "
            >
              Whatsapp
            </Badge>
          )}
        </div>
      </div>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/pill-box/daily-uptake/${row.original.id}`}>Edit </Link>
    )
  }
]

export const sentMessagesColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 pt-1 pb-1">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-blue-500"
          href={`/patients/${row.original?.Patient.id}?tab=messages`}
        >{`${row.original?.Patient?.firstName} ${row.original?.Patient?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'medicineTime',
    header: 'Medicine Time',
    cell: ({ row }) => (
      <p>{moment(row.original.medicineTime, 'HH:mm:ss').format('HH:mm a')} </p>
    )
  },
  {
    accessorKey: 'message',
    header: 'Messages'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const sentTime = moment(row.original.createdAt, 'HH:mm:ss')
      const medicineTime = moment(row.original.medicineTime, 'HH:mm:ss')
      const isSame = () => {
        if (sentTime.isSame(medicineTime)) {
          return true
        }
        return false
      }

      return (
        <div>
          {sentTime.format('HH:mm a')}
          {isSame()
            ? (
            <Badge className="rounded-full shadow-none bg-teal-50 text-teal-600 hover:bg-teal-100">
              OK
            </Badge>
              )
            : (
            <Badge className="rounded-full bg-red-50 text-red-500 shadow-none hover:bg-red-100">
              NOT OK
            </Badge>
              )}
        </div>
      )
    }
  }
]
