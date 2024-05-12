'use client'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/context/SidebarContext'
import Image from 'next/image'
// import { BellIcon } from 'lucide-react'
export const Sidebar = ({ children, isSearchable = true }: { children: React.ReactNode, isSearchable?: boolean }) => {
  const { isSidebarOpen } = useSidebar()
  return (
    <div
      className={`
        bg-[#003153]
        h-screen
        w-64
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
          <Button
            className="w-full mb-4 shadow-none bg-[#003153]/5
          text-slate-700 font-bold hover:bg-slate-100
          "
          >
            Login
          </Button>
          <p className="text-xs underline text-[#F3FAFF]">
            Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  )
}
