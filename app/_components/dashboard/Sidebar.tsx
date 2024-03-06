'use client'
import '../../globals.css'
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-white
    h-screen
    w-64
    fixed
    z-20
    border-r
    border-slate-200

    "
    >
      {children}
    </div>
  )
}
