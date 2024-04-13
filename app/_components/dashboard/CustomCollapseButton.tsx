'use client'
import '../../globals.css'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'
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
  const [visible, setVisible] = useState(false)

  const onToggle = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className="flex-1">
      <div
        onClick={onToggle}
        className={`flex items-center justify-between text-slate-600 text-sm w-full
        hover:cursor-pointer  hover:bg-slate-50 hover:text-slate-500 p-2 rounded-lg
        `}
      >
        <div className="flex flex-row space-x-2">
          <p className={'font-semibold text-black text-base'}>{label}</p>
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
        <div className="pl-2">
          <div
            className={
              'duration-100 p-2 w-full border border-slate-200 rounded-lg'
            }
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
