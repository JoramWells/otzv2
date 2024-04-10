/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { type MomentInput } from 'moment'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useUpdatePillDailyUptakeMutation } from '@/api/treatmentplan/uptake.api'
import Avatar from '@/app/_components/Avatar'
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
  eveningStatus: any
  morningStatus: any
  timeAndWork: any
  refillDate: MomentInput
  appointmentTime: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  appointmentStatus: any
  user: any
  patient: any
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

interface EditableCellProps {
  value: boolean | undefined
  row: {
    original: {
      id: string
    }
  }
}

const EditableCell = ({ value, row }: EditableCellProps) => {
  const [checked, setChecked] = useState(value)
  const inputValues = {
    id: row.original.id,
    morningStatus: !checked
  }
  const [updatePillDailyUptake] = useUpdatePillDailyUptakeMutation()
  const handleChange = () => {
    setChecked(prev => !prev)
    updatePillDailyUptake(inputValues)
    // onChange(e)
    console.log(row.original)
  }

  return <Switch checked={checked}
  onCheckedChange={() => { handleChange() }}
  className='text-teal-600'
  />
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'patient',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-start gap-x-2">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original?.patient?.firstName} ${row.original?.patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original?.patient?.firstName} ${row.original?.patient?.middleName}`}</p>
        </div>
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
