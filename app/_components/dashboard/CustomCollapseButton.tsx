'use client'
import '../../globals.css'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SidebarSubButton } from './SidebarSubButton'
import { type ReactNode, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'

interface ItemListProps {
  id?: string
  link: string
  label: string
}

interface CustomCollapseButtonProps {
  icon?: React.ReactNode
  label: string
  link?: string
  itemList?: ItemListProps[]
  children: ReactNode
}

export const CustomCollapseButton = ({
  label = 'Dashboard',
  link,
  itemList,
  icon = <div />,
  children
}: CustomCollapseButtonProps) => {
  // const { isOpen, onToggle } = useDisclosure()
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return pathname.includes(label.toLowerCase())
  }, [pathname, label])

  const onToggle = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div>
      <div
        onClick={onToggle}
        className={`flex items-center justify-between text-slate-600 text-sm
        hover:cursor-pointer  hover:bg-sky-50 hover:text-sky-600 p-2 ${
          isActive &&
          'bg-sky-50 text-sky-500 border-l-4 border-sky-600 border-b'
        }
        `}
      >
        <div className="flex flex-row space-x-2">
          <p className={'font-semibold text-black text-lg'}>{label}</p>
          <Badge
            className="shadow-none rounded-full
          bg-slate-50 text-slate-600 border-slate-200
hover:bg-slate-100

          "
          >
            Pending
          </Badge>
        </div>
        {visible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      {visible && (
        <div className={'duration-100 p-2 w-full border-t border-slate-200'}>
          {children}
        </div>
      )}
    </div>
  )
}
