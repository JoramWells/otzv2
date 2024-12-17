/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import Avatar from '@/components/Avatar'
import { type ExtendedVitalSignsInterface } from '@/api/lab/vitalSigns.api'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<ExtendedVitalSignsInterface>> = [
  {
    accessorKey: 'patient',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2 text-[12px] items-center">
        <Avatar
          name={`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}
        />
        <div className="flex flex-col space-y-1">
          <Link
            className="capitalize"
            href={`/patients/${row.original.patientID}`}
          >{`${row.original.Patient?.firstName} ${row.original.Patient?.middleName}`}</Link>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => (
      <p className="text-slate-500 text-[12px] ">{row.original.height}</p>
    )
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <p className="text-[12px]">{row.original.weight}</p>
  }, {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <p
    className='text-[12px] text-slate-500'
    >{moment(row.original.createdAt).format('ll')}</p>
  }

]
