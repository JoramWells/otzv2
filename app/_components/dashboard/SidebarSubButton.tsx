/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import '../../globals.css'

interface SidebarSubButtonProps {
//   icon: React.ReactNode;
  label: string
  //   selected: boolean;
  //   onClick: () => {};
  link: string
}

export const SidebarSubButton = ({
//   icon,
  label,
  //   selected,
  //   onClick,
  link
}: SidebarSubButtonProps) => {
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return link === pathname
  }, [link, pathname])
  return (
    <div className={`flex h-10 items-center pl-4
    text-slate-500 text-md
    text-md ml-6 rounded-md
    ${isActive && 'bg-sky-50'}
    ${isActive && 'bg-teal-50 text-sky-500'}
    `}
    >
      <Link href={link}
      className='text-sm'
      >{label}</Link>
    </div>
  )
}
