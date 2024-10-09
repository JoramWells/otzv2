import React, { type ReactNode } from 'react'

interface CardHeaderProps {
  header: string
  rightContent?: ReactNode
}

const CardHeader = ({ header, rightContent }: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full border-b bg-slate-50 border-slate-200  p-2 pl-4 pr-4  rounded-t-lg">
      <h3 className="text-[14px]  font-bold">{header}</h3>
      {rightContent}
    </div>
  )
}

export default CardHeader
