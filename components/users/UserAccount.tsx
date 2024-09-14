/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import {
  ChevronDownIcon,
  UserCircle
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type UserInterface } from 'otz-types'

export function UserAccount ({ user }: { user: UserInterface }) {
  // const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <UserCircle className="" size={18} />
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="capitalize">
          <span>
            {user?.firstName} {' '}
            {user?.middleName}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="capitalize">Your Profile</DropdownMenuItem>

        <DropdownMenuSeparator />

        {/*  */}
        <DropdownMenuItem className="capitalize">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
