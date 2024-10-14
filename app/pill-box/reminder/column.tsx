/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import {
  useDeletePillDailyUptakeMutation,
  useUpdatePillUptakeEveningStatusMutation
} from '@/api/treatmentplan/uptake.api'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Loader2, Trash2 } from 'lucide-react'
import { type AdherenceAttributes } from 'otz-types'
import { useRouter } from 'next/navigation'
// import { FaEdit } from 'react-icons/fa'

export interface ExtendedAdherenceAttributes extends AdherenceAttributes {
  id: string
  TimeAndWork?: {
    id: string
    morningMedicineTime: string
    eveningMedicineTime: string
    Patient: {
      firstName: string
      middleName: string
    }
  }
  // render?: (props: any) => React.ReactNode
}

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
  time: string
  row: {
    original: {
      id: string
    }
  }
}

interface InputValuesProps {
  id: string
  eveningStatus?: boolean
  morningStatus?: boolean
}

const EditableCell = ({ value, time, row }: EditableCellProps) => {
  const [checked, setChecked] = useState(value)
  const inputValues: InputValuesProps = {
    id: row.original.id,
    eveningStatus: !checked
  }

  if (time === 'morning') {
    inputValues.morningStatus = !checked
    delete inputValues.eveningStatus
  }

  const [updatePillUptakeEveningStatus] =
    useUpdatePillUptakeEveningStatusMutation()
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

export const eveningColumn = (handleDelete: (id: string) => void): Array<ColumnDef<ExtendedAdherenceAttributes>> => [
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
          <p className="capitalize font-semibold text-[12px]">{`${row.original.TimeAndWork?.Patient?.firstName} ${row.original.TimeAndWork?.Patient?.middleName}`}</p>
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
      <EditableCell value={row.original?.eveningStatus} time='evening' row={row} />
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()

      const [deletePillDailyUptake, { isLoading }] =
        useDeletePillDailyUptakeMutation()
      return (
        <div className="flex flex-row space-x-2">
          <div className="hover:bg-red-200 hover:text-red-200 h-7 w-7 rounded-full flex items-center justify-center">
            {isLoading
              ? (
              <Loader2 size={16} />
                )
              : (
              <Trash2
                size={16}
                className="hover:cursor-pointer text-slate-500 hover:text-red-500"
                onClick={async () => {
                  handleDelete(row.original.id)
                  await deletePillDailyUptake(row.original.id)
                }}
              />
                )}
          </div>
          <div
            onClick={() => {
              router.push(`/pill-box/reminder/${row.original.id}`)
            }}
            className="hover:bg-blue-200 hover:text-blue-200 h-7 w-7 rounded-full flex items-center justify-center"
          >
            <ArrowRight
              size={16}
              className="hover:cursor-pointer text-slate-500 hover:text-blue-500"
            />
          </div>
        </div>
      )
    }
  }
]

export const morningColumn = (handleDelete: (id: string) => void): Array<ColumnDef<ExtendedAdherenceAttributes>> => [
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
        <div className="text-[12px]">
          <p className="capitalize font-semibold">{`${row.original.TimeAndWork?.Patient?.firstName} ${row.original.TimeAndWork?.Patient?.middleName}`}</p>
        </div>
      </div>
    )
  },
  // <X />
  {
    accessorKey: 'morningStatus',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-2 text-[12px]">
        <p className="">{row.original.TimeAndWork?.morningMedicineTime} AM</p>

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
    rounded-full hover:bg-slate-100 shadow-none text-[12px]
    "
      >
        On Time
      </Badge>
    )
  },
  //   {
  //     accessorKey: 'createdAt',
  //     header: 'Created At',
  //     cell: ({ row }) => <p>
  // {/* {moment(row.original?.createdAt).format('ll')} */}
  // {row.original?.createdAt}
  //     </p>
  //   },
  {
    accessorKey: 'RT',
    header: 'Confirm',
    cell: ({ row }) => (
      <EditableCell value={row.original?.morningStatus} time='morning' row={row} />
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const router = useRouter()
      const [deletePillDailyUptake, { isLoading }] =
        useDeletePillDailyUptakeMutation()
      return (
        <div className="flex flex-row space-x-2">
          <div className="hover:bg-red-200 hover:text-red-200 h-7 w-7 rounded-full flex items-center justify-center">
            {isLoading
              ? (
              <Loader2 size={16} />
                )
              : (
              <Trash2
                size={16}
                className="hover:cursor-pointer text-slate-500 hover:text-red-500"
                onClick={async () => {
                  handleDelete(row.original.id)
                  await deletePillDailyUptake(row.original.id)
                }}
              />
                )}
            {/*  */}
          </div>
          <div
          onClick={() => { router.push(`/pill-box/reminder/${row.original.id}`) }}
          className="hover:bg-blue-200 hover:text-blue-200 h-7 w-7 rounded-full flex items-center justify-center">
            <ArrowRight size={16} className="hover:cursor-pointer text-slate-500 hover:text-blue-500" />
          </div>
        </div>
      )
    }
  }
]
