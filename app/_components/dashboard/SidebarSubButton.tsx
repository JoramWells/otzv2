/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

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
    text-slate-500 text-md bg-white text-md ml-4 rounded-md ${isActive && 'bg-teal-50 text-teal-500'}
    `}
    >
      <Link href={link}
      className='text-sm'
      >{label}</Link>
    </div>
  )
}
