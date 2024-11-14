/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { ChevronDownIcon, UserCircle } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type UserInterface } from 'otz-types'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function UserAccount ({ user }: { user: UserInterface }) {
  // const { data: session } = useSession()
  const router = useRouter()
  const logOut = async () => {
    await signOut()
    router.push('/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto shadow-none">
          <UserCircle className="" size={18} />
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="capitalize">
          <span>
            {user?.firstName} {user?.middleName}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="capitalize">Your Profile</DropdownMenuItem>

        <DropdownMenuSeparator />

        {/*  */}
        <DropdownMenuItem className="capitalize" onClick={async () => { await logOut() }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
