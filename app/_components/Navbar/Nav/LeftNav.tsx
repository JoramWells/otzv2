// 'use client'
import { useSidebar } from '@/context/SidebarContext'
import { Menu } from 'lucide-react'

const LeftNav = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <Menu
      onClick={toggleSidebar}
      className="hover:cursor-pointer hover:bg-slate-100
      rounded-md bg-slate-50 h-7 w-7 p-1 hover:text-slate-600
      "
    />
  )
}

export default LeftNav
