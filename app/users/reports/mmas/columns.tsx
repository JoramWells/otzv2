/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { Button } from '@/components/ui/button'

import Avatar from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
import { type ColumnDef } from '@tanstack/react-table'
import { BadgeCheck, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type MMASFourAttributes } from 'otz-types'
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

export type MMASInterface = MMASFourAttributes & {
  Patient: {
    firstName: string
    middleName: string
    avatar: string
  }
}

export const columns: Array<ColumnDef<MMASInterface>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const { firstName, middleName, avatar } = row.original.Patient
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
            <Avatar name={`${firstName} ${middleName}`} />
          )}
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={'/users/patients/tab/dashboard/'}
          >{`${firstName} ${middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'isCareless',
    header: 'Careless',
    cell: ({ row }) => (
      <>
        {row.original?.isCareless ? (
          <Badge className="bg-emerald-100 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'isForget',
    header: 'Forget',
    cell: ({ row }) => (
      <>
        {row.original?.isForget ? (
          <Badge className="bg-emerald-100 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'isQuitFeelBetter',
    header: 'Quit/Better',
    cell: ({ row }) => (
      <>
        {row.original?.isQuitFeelBetter ? (
          <Badge className="bg-emerald-100 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'isQuitFeelWorse',
    header: 'Quit/Worse',
    cell: ({ row }) => (
      <>
        {row.original?.isQuitFeelWorse ? (
          <Badge className="bg-emerald-100 text-emerald-500 shadow-none hover:bg-emerald-200">
            <BadgeCheck size={16} />
            <p className="ml-2">Yes</p>
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-500 shadow-none hover:bg-red-200">
            <XCircle size={16} />
            <p className="ml-2">No</p>
          </Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'totalScores',
    header: 'Total Score',
    cell: ({ row }) => {
      const { totalScores } = row.original

      return <p className="text-[12px]">{totalScores}</p>
    }
  }
]
