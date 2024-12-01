/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type NotificationAttributes } from 'otz-types'
import { type ReactNode } from 'react'

export function CustomDropDown ({ data, buttonLabel, title }: { data: NotificationAttributes[], buttonLabel: ReactNode, title: string }) {
  // const { data: session } = useSession()
  // const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
 {buttonLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="shadow-none">
        <DropdownMenuLabel>{title}s</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="h-[200px] w-auto overflow-y-auto">
          {data?.map((item) => (
            <>
              <DropdownMenuItem
                className="capitalize hover:cursor-pointer hover:text-slate-700"
                key={item.id}
              >
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
