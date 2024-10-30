/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Button } from '@/components/ui/button'

import Avatar from '@/components/Avatar'
import { type ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

//
export interface VitalSignsInterface {
  id: string
  patient: {
    id: string
    avatar: string
    firstName: string
    middleName: string
  }
  height: string
  weight: string
  diastolic: string
  systolic: string
  respiratoryRate: string
  oxygenSAturation: string
  lmp: string
  muac: string
  edd: string
  parity: string
  gravida: string
  pulseRate: string
  createdAt: string
}

export const columns: Array<ColumnDef<VitalSignsInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Requested By',
    cell: ({ row }) => {
      const { id, firstName, middleName, avatar } = row.original.patient
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          {avatar ? (
            <Image
              // w={0}
              alt="im"
              // placeholder="data:image/..."
              width={25}
              height={25}
              // quality={25}
              // fill
              // objectFit='contain'
              // priority
              className="rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/users/${avatar}`}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Avatar
              name={`${firstName} ${middleName}`}
            />
          )}
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${id}`}
          >{`${firstName} ${middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.height}</p>
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.weight}</p>
  },
  {
    accessorKey: 'bp',
    header: 'BP',
    cell: ({ row }) => (
      <p className="text-[12px]">
        {row.original.systolic &&
        row.original?.systolic}/{row.original?.diastolic
        }
      </p>
    )
  },
  {
    accessorKey: 'respiratoryRate',
    header: 'Respiratory Rate',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.respiratoryRate}</p>
    )
  },
  {
    accessorKey: 'oxygenSAturation',
    header: 'Oxygen Saturation',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.oxygenSAturation}</p>
    )
  },
  {
    accessorKey: 'pulseRate',
    header: 'Pulse Rate',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.pulseRate}</p>
  },
  {
    accessorKey: 'lmp',
    header: 'LMP',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.lmp}</p>
  },
  {
    accessorKey: 'muac',
    header: 'MUAC',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.muac}</p>
  },
  {
    accessorKey: 'edd',
    header: 'EDD',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.edd}</p>
  },
  {
    accessorKey: 'gravida',
    header: 'Gravida',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.gravida}</p>
  },
  {
    accessorKey: 'parity',
    header: 'Parity',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.parity}</p>
  },

  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => <p>{moment(row.original.createdAt).format('LL')}</p>
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon size={18} />
      </div>
    )
  }
]
