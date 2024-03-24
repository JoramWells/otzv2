'use client'
import '../../globals.css'
import { useSidebar } from '@/context/SidebarContext'
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebar()
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
