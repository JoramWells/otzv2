// 'use client'
import { useSidebar } from '@/context/SidebarContext'
import { Menu } from 'lucide-react'
import Image from 'next/image'

const LeftNav = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="flex flex-row items-center space-x-4">
      <Menu
        onClick={toggleSidebar}
        className="hover:cursor-pointer hover:bg-slate-100
      rounded-md bg-slate-200 h-7 w-7 p-1 hover:text-slate-600
      border border-slate-100
      "
      />
      <Image
        src={'logo1.svg'}
        alt="img"
        width={120}
        height={80}
        objectFit="contain"
        quality={100}
      />
    </div>
  )
}

export default LeftNav
