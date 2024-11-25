/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type AppModuleInterface } from 'otz-types'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<AppModuleInterface>> = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
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
        src={`${process.env.NEXT_PUBLIC_API_URL}/api/root/${row.original.img}`}
        style={{
          width: '25px',
          height: '25px',
          objectFit: 'cover'
        }}
      />
    )
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <p className="text-[12px] font-semibold text-slate-700">
        {row.original.title}
      </p>
    )
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <Badge
        className='bg-slate-200 rounded-r-none shadow-none text-slate-700 hover:bg-slate-100 '
        >{process.env.NEXT_PUBLIC_API_URL}</Badge>
        <p className="text-[12px] text-blue-500 ">{row.original.link}</p>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500 ">{row.original?.description}</p>
    )
    // enableSorting: true
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => {
            router.push(`/administrator/app-modules/${row.original.id}`)
          }}
          className="hover:bg-blue-200 hover:text-blue-200 p-2 shadow-none  rounded-full flex items-center justify-center"
        >
          <ArrowRight
            size={16}
            className="hover:cursor-pointer text-slate-500 hover:text-blue-500"
          />
        </Button>
      )
    }
  }
]
