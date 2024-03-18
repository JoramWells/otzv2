'use client'
import '../../globals.css'

import { Collapse, useDisclosure } from '@chakra-ui/react'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SidebarSubButton } from './SidebarSubButton'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface ItemListProps {
  id?: string
  link: string
  label: string
}

interface SidebarCollapseButtonProps {
  icon?: React.ReactNode
  label: string
  itemList?: ItemListProps[]
}

export const SidebarCollapseButton = ({ label = 'Dashboard', itemList, icon = <div/> }: SidebarCollapseButtonProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return pathname.includes(label.toLowerCase())
  }, [pathname, label])
  return (
    <div className="mb-2">
      <div
        onClick={onToggle}
        className={`flex h-10 items-center pl-4 pr-4 justify-between text-slate-600 text-sm
        hover:cursor-pointer overflow-y-auto hover:bg-sky-50 hover:text-sky-500 font-bold ${
          isActive && 'bg-sky-50 text-sky-500'
        }
        `}
      >
        <div className="flex flex-row items-center space-x-2">
          {icon}
          <p
          // href={'/'}
          >
            {label}
          </p>
        </div>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      <Collapse in={isOpen}>
        {itemList?.map((item) => (
          <SidebarSubButton key={item.id} label={item.label} link={item.link} />
        ))}
      </Collapse>
    </div>
  )
}
