'use client'

import { Collapse, useDisclosure } from '@chakra-ui/react'
// import Link from 'next/link'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { SidebarSubButton } from './SidebarSubButton'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface ItemListProps {
  id?: string
  link: string
  label: string
}

interface SidebarCollapseButtonProps {
  label: string
  itemList?: ItemListProps[]
}

export const SidebarCollapseButton = ({ label = 'Dashboard', itemList }: SidebarCollapseButtonProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return pathname.includes(label.toLowerCase())
  }, [pathname, label])
  return (
    <>
      <div
        onClick={onToggle}
        className={`flex h-10 items-center pl-4 pr-4 justify-between font-semibold
        hover:cursor-pointer overflow-y-auto hover:bg-teal-50 hover:text-teal-500 ${isActive && 'bg-teal-50 text-teal-500'}
        `}
      >
        <p
          // href={'/'}
        >
          {label}
        </p>
        {isOpen
          ? (
          <FaChevronDown />
            )
          : (
          <FaChevronRight />
            )}
      </div>

      <Collapse in={isOpen}>
        {itemList?.map((item) => (
          <SidebarSubButton key={item.id} label={item.label} link={item.link} />
        ))}
      </Collapse>
    </>
  )
}
