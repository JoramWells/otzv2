/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/context/SidebarContext'
import { CircleUser } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { type UserInterface } from 'otz-types'
import { useEffect, useState } from 'react'
// import { BellIcon } from 'lucide-react'
export const Sidebar = ({ children, isSearchable = true }: { children: React.ReactNode, isSearchable?: boolean }) => {
  const { isSidebarOpen } = useSidebar()
  const { data: session } = useSession()
  const [user, setUser] = useState<Partial<UserInterface>>()
  useEffect(() => {
    if (session) {
      const transformedUser: Partial<UserInterface> = {
        ...session.user,
        email: session.user.email ?? undefined
      }
      setUser(transformedUser)
    }
  }, [session])

  return (
    <div
      className={`
        bg-[#364f6b]
        h-screen
        w-56
        overflow-y-auto
        ${isSidebarOpen ? 'inline' : 'hidden'}
        relative

    `}
    >
      <div
        className="p-4 flex flex-row items-center border-b border-slate-200
      justify-center"
      >
        <Image
          src={'/img/logo1.svg'}
          alt="img"
          width={0}
          height={0}
          style={{ width: '90px', height: 'auto' }}

          // quality={100}
        />
      </div>

      {children}
      {/* <div className="absolute w-full bottom-0 flex flex-col items-center p-2">
        <p className="text-sm text-slate-500">Terms & Conditions Applied</p>
        <div className="flex flex-row text-sm">
          <p className="text-blue-500 text-underline">Powered by Synergy</p>
        </div>
      </div> */}
      <div className="absolute p-4 bottom-0  w-full text-center">
        <div>
          {user
            ? (
            <div className="flex space-x-4 marker:items-center p-2 text-white">
              <CircleUser />
              <p>{user.firstName}</p>
            </div>
              )
            : (
            <Button
              className="w-full mb-4 shadow-none bg-[#003153]/5
          text-slate-700 font-bold hover:bg-slate-100
          "
            >
              Login
            </Button>
              )}
        </div>
      </div>
    </div>
  )
}
