/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useDeletePillDailyUptakeMutation, useUpdatePillUptakeEveningStatusMutation } from '@/api/treatmentplan/uptake.api'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
import { type ExtendedAdherenceAttributes } from './morningColumn'
import { Loader2, Trash2 } from 'lucide-react'
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
    eveningStatus: !checked
  }
  const [updatePillUptakeEveningStatus] = useUpdatePillUptakeEveningStatusMutation()
  const handleChange = () => {
    setChecked((prev) => !prev)
    updatePillUptakeEveningStatus(inputValues)
    // onChange(e)
    console.log(row.original)
  }

  return (
    <Switch
      checked={checked}
      onCheckedChange={() => {
        handleChange()
      }}
      className="text-teal-600"
    />
  )
}

export const eveningColumn: Array<ColumnDef<ExtendedAdherenceAttributes>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 pt-1 pb-1">
        <Avatar
          // size={'sm'}
          // className="font-bold"
          name={`${row.original.TimeAndWork?.Patient?.firstName} ${row.original.TimeAndWork?.Patient?.middleName}`}
        />
        <div>
          <p className="capitalize font-semibold">{`${row.original.TimeAndWork?.Patient?.firstName} ${row.original.TimeAndWork?.Patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  // <X />
  {
    accessorKey: 'eveningStatus',
    header: 'Evening Status',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-2 text-[12px]">
        <p className="text-[12px] ">
          {row.original.TimeAndWork?.eveningMedicineTime}
        </p>

        {/* <div
          className="flex flex-row space-x-2
        items-center text-[12px]
        "
        >
          {row.original?.morningStatus
            ? (
            <p className="text-teal-600">Completed</p>
              )
            : (
            <p className="text-slate-600">Completed</p>
              )}
        </div> */}
      </div>
    )
  },
  {
    accessorKey: 'nofOfPills',
    header: 'Status',
    cell: () => (
      <Badge
        className="bg-slate-200 text-slate-700
    rounded-full hover:bg-slate-100 shadow-none
    "
      >
        On Time
      </Badge>
    )
  },
  {
    accessorKey: 'RT',
    header: 'Action',
    cell: ({ row }) => (
      <EditableCell value={row.original?.eveningStatus} row={row} />
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const [deletePillDailyUptake, { isLoading }] =
        useDeletePillDailyUptakeMutation()
      return (
        <div className="hover:bg-red-200 hover:text-red-200 h-7 w-7 rounded-full flex items-center justify-center">
          {isLoading
            ? (
            <Loader2 size={16} />
              )
            : (
            <Trash2
              size={16}
              className="hover:cursor-pointer text-slate-500 hover:text-red-500"
              onClick={async () => await deletePillDailyUptake(row.original.id)}
            />
              )}
        </div>
      )
    }
  }
]
