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

export function UserProfile ({ user }: { user: UserInterface }) {
  // const { data: session } = useSession()
  const router = useRouter()
  const logOut = async () => {
    await signOut()
    router.push('/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          // size={'sm'}
          className="ml-auto hover:opacity-50 text-white flex justify-between shadow-none w-full bg-transparent"
        >
          <div
          className='flex items-center space-x-2'
          >
            <UserCircle className="" size={18} />
            <span className='font-semibold' >{user?.firstName}</span>
          </div>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="capitalize hover:cursor-pointer"
        onClick={() => { router.push(`/users/account/${user.id}`) }}
        >
          <span>
            {user?.firstName} {user?.middleName}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="capitalize">{user?.role}</DropdownMenuItem>

        <DropdownMenuSeparator />

        {/*  */}
        <DropdownMenuItem
          className="capitalize"
          onClick={async () => {
            await logOut()
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
