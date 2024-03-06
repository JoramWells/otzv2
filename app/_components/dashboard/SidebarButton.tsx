'use client'

import Link from 'next/link'

interface SidebarButtonProps {
  label?: string
}

export const SidebarButton = ({ label }: SidebarButtonProps) => {
  return (
    <div className="flex bg-gradient-to-l from-sky-800 to-sky-600 h-10 items-center pl-4">
     <Link
     href={'/'}
     className="text-blue-50"
     >
     Dashboard
     </Link>
    </div>
  )
}
