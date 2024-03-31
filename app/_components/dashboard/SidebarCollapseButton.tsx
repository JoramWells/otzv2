'use client'
import '../../globals.css'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SidebarSubButton } from './SidebarSubButton'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
// import { Button } from '@/components/ui/button'

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
  // const { isOpen, onToggle } = useDisclosure()
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return pathname.includes(label.toLowerCase())
  }, [pathname, label])

  const onToggle = () => {
    setVisible(prev => !prev)
  }

  return (
    <div className="mb-2">
      <div
        onClick={onToggle}
        className={`flex h-10 items-center pl-4 pr-4 justify-between text-slate-500 text-sm
        hover:cursor-pointer overflow-y-auto hover:bg-sky-50 hover:text-sky-500 font-bold ${
          isActive && 'bg-sky-50 text-sky-500'
        }
        `}
      >
        <div className="flex flex-row items-center space-x-2">
          {icon}
          <p
          // href={'/'}
          className={`${isActive ? 'text-sky-600' : 'text-slate-500'}`}
          >
            {label} {isActive}
          </p>
        </div>
        {visible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      <div className={`${visible ? 'inline' : 'hidden'} bg-gray-500 duration-100`}>
        {itemList?.map((item) => (
          <SidebarSubButton key={item.id} label={item.label} link={item.link} />
        ))}
      </div>

      {/* <Collapse in={isOpen}>
        {itemList?.map((item) => (
          <SidebarSubButton key={item.id} label={item.label} link={item.link} />
        ))}
      </Collapse> */}
    </div>
  )
}
