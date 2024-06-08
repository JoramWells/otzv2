'use client'
import '../../globals.css'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'
// import { Button } from '@/components/ui/button'

interface ItemListProps {
  id?: string
  link: string
  label: string
}

interface CollapseButtonProps {
  icon?: React.ReactNode
  label: string
  link?: string
  itemList?: ItemListProps[]
  children: ReactNode
}

export const CollapseButton = ({
  label = 'Dashboard',
  link,
  itemList,
  icon = <div />,
  children
}: CollapseButtonProps) => {
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
          <p className={'text-black text-base'}>{label}</p>

        </div>
        {visible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      {visible && (
          <div
            className={
              'duration-100 p-2 w-full bg-slate-50 rounded-lg'
            }
          >
            {children}
          </div>
      )}
    </div>
  )
}
