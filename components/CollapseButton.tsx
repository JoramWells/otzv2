'use client'
// import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'

interface CollapseButtonProps {
  label: ReactNode
  children: ReactNode
}

export const CollapseButton = ({
  label = 'Dashboard',
  children
}: CollapseButtonProps) => {
  // const { isOpen, onToggle } = useDisclosure()
  const [visible, setVisible] = useState(false)
  const onToggle = () => {
    setVisible((prev) => !prev)
  }

  return (
    <>
      <Button
        onClick={onToggle}
        className={`flex items-center justify-between text-slate-600 text-sm w-full bg-white
        hover:cursor-pointer  hover:bg-slate-50 hover:text-slate-500 p-2 rounded-lg ${visible && 'bg-slate-50 border-b border-slate-200 rounded-b-none '}
        `}
      >
          {label}

        {visible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </Button>

      {visible && (
          <div
            className={
              'duration-100 p-2 w-full rounded-t-none rounded-lg mb-2'
            }
          >
            {children}
          </div>
      )}
    </>
  )
}
