/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

interface SideMenuBarProps {
  selected: boolean
  text: string
  onClick?: () => void
}

const SideMenuBar = ({ selected, text, onClick }: SideMenuBarProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(!isSelected)
  }

  return (
    <div
      className="bg-slate-100
    w-full h-12 flex flex-row items-center pl-4 rounded-md text-sm
    hover:cursor-pointer
    "
    onClick={onClick}
    >
      <p className="text-black">{text}</p>
    </div>
  )
}

export default SideMenuBar
