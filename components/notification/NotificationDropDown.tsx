/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { Bell } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type NotificationAttributes } from 'otz-types'

export function NotificationDropDown ({ data }: { data: NotificationAttributes[] }) {
  // const { data: session } = useSession()
  // const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shadow-none relative" size={'sm'} variant={'ghost'}>
          <Bell size={18} />
          <div className="absolute p-1 rounded-full shadow-none top-0 right-0 text-[10px] font-semibold h-5 w-5 flex items-center justify-center bg-red-500 hover:bg-red-400">
            {data?.length >= 10 ? '10+' : data?.length}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='shadow-none' >
        {/* <DropdownMenuItem className="capitalize">
          <span>
            {user?.firstName} {user?.middleName}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        <div className="h-[200px] w-auto overflow-y-auto">
          {data?.map((item) => (
            <>
              <DropdownMenuItem className="capitalize hover:cursor-pointer hover:text-slate-700" key={item.id}>
                <p className="text-[12px] text-slate-500">
                  {item?.notificationDescription?.substring(0, 50)}...
                </p>
              </DropdownMenuItem>
            </>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
