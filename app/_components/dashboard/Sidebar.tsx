'use client'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-white
    h-screen
    w-64
    fixed
    z-20
    border-r

    "
    >
      {children}
    </div>
  )
}
