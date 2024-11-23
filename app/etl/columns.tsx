/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { type ExtendedLineListInterface } from '@/api/etl/etl.api'
import Progress from '@/components/Progress'
import { type ColumnDef } from '@tanstack/react-table'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'

export interface FullNameProps {
  firstName?: string
}

export interface PrescriptionProps {
  file: string
  frequency: number
  computedNoOfPills: number
  expectedNoOfPills: number
  noOfPills: number
  User: {
    firstName: string
    middleName: string
  }
  ART: {
    artName: string
  }
  refillDate: MomentInput | string
  nextRefillDate: MomentInput
  appointmentTime: MomentInput
  appointmentDate: any
  appointmentAgenda: any
  createdAt: Date
  user: any
  Patient: any
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

export const linelistColumn = (
  statuses: Record<string, any>
): Array<ColumnDef<ExtendedLineListInterface>> => [
  {
    accessorKey: 'file',
    header: 'file',
    cell: ({ row }) => (
      <Link
        href={`/etl/${row.original.id}`}
        className="text-blue-500 text-[12px] capitalize "
      >
        {row.original.file?.replace('csvs/', '')?.replace('.csv', '')}
      </Link>
    )
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500 ">
        {((row.original?.size) != null) && (row.original.size as unknown as number / 1024).toFixed(2)} KB
      </p>
    )
  },
  {
    accessorKey: 'uploaded',
    header: 'Uploaded By',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500 font-semibold">
        {row.original?.User?.firstName} {row.original?.User?.middleName}
      </p>
    )
  },
  {
    accessorKey: 'success',
    header: 'Success',
    cell: async ({ row }) => {
      const taskID = row.original?.taskID
      const taskStatus = statuses[taskID as string]
      return (
        Boolean(taskStatus) && (
          <div>
            <p className="text-[12px] text-slate-500">{taskStatus?.status}</p>
            {Boolean(taskStatus?.progress) && (
              <Progress percentage={Math.floor(taskStatus?.progress)} />
            )}
          </div>
        )
      )
    }
  },
  {
    accessorKey: 'Updated',
    header: 'Updated',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">
        {moment(row.original.createdAt).calendar()}
      </p>
    )
  }
  // {
  //   accessorKey: 'action',
  //   header: '',
  //   cell: ({ row }) => <Button
  //   size={'sm'}
  //   >
  //     Open
  //   </Button>
  // }
]
