/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ColumnDef } from '@tanstack/react-table'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useDeletePillDailyUptakeMutation, useUpdatePillDailyUptakeMutation } from '@/api/treatmentplan/uptake.api'
import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, Trash2 } from 'lucide-react'
import { type AdherenceAttributes } from 'otz-types'
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

export interface ExtendedAdherenceAttributes extends AdherenceAttributes {
  id: string
  TimeAndWork?: {
    morningMedicineTime: string
    eveningMedicineTime: string
    Patient: {
      firstName: string
      middleName: string
    }
  }
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
  }

  return <Switch checked={checked}
  onCheckedChange={() => { handleChange() }}
  className='text-teal-600'
  />
}

export const morningColumn: Array<ColumnDef<ExtendedAdherenceAttributes>> = [
  {
    accessorKey: 'patient',
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
    header: 'Morning Status',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-2 text-[12px]">
        <div className="flex flex-row items-center">
          <p className="font-bold text-slate-500 text-[14px] ">Time: </p>
          <p className="text-[14px] ">
            {row.original.TimeAndWork?.morningMedicineTime}
          </p>
        </div>

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
      <EditableCell value={row.original?.morningStatus} row={row} />
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const [deletePillDailyUptake, { isLoading }] =
        useDeletePillDailyUptakeMutation()
      return (
        <>
          {isLoading
            ? (
            <Loader2 size={18} />
              )
            : (
            <Trash2
              size={18}
              className="hover:cursor-pointer bg-slate-200"
              onClick={async () => await deletePillDailyUptake(row.original.id)}
            />
              )}
        </>
      )
    }
  }
]
