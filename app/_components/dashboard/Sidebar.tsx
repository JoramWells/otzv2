'use client'
import { useState } from 'react'
import '../../globals.css'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/context/SidebarContext'
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  return (
    <div
      className={`
        bg-white
        h-screen
        w-64
        z-20
        border-r
        border-slate-200
        ${isSidebarOpen ? 'inline' : 'hidden'}

    `}
    >
      {children}
    </div>
  )
}
