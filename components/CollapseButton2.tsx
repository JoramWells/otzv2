'use client'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'

interface CollapseButtonProps {
  label: string
  children: ReactNode
}

export const CollapseButton2 = ({
  label = 'Dashboard',
  children
}: CollapseButtonProps) => {
  // const { isOpen, onToggle } = useDisclosure()
  const [visible, setVisible] = useState(false)
  const onToggle = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className='w-full'>
      <Button
        onClick={onToggle}
        className={`flex items-center justify-between text-slate-600  w-full bg-white
        hover:cursor-pointer  hover:bg-slate-50 hover:text-slate-500 p-2 rounded-lg 
        `}
      >
          <p className={'text-black font-bold'}>{label}</p>

        {visible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </Button>

      {visible && (
          <div
            className={
              'duration-100 p-2 w-full  rounded-lg'
            }
          >
            {children}
          </div>
      )}
    </div>
  )
}
