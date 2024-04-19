'use client'
import { Button } from '@/components/ui/button'
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
        border-r
        pt-16
        border-slate-200
        overflow-y-auto
        ${isSidebarOpen ? 'inline' : 'hidden'}
        relative

    `}
    >
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
            className="w-full mb-4 shadow-none bg-slate-200
          text-slate-700 font-bold hover:bg-slate-100
          "
          >
            Login
          </Button>
          <p className="text-sm underline">Terms and Conditions</p>
        </div>
      </div>
    </div>
  )
}
