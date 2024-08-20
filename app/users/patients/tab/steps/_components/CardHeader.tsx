import React, { type ReactNode } from 'react'

interface CardHeaderProps {
  header: string
  rightContent?: ReactNode
}

const CardHeader = ({ header, rightContent }: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full border-b bg-slate-50 border-slate-200  p-3  rounded-t-lg">
      <p className="text-lg  font-bold">{header}</p>
      {rightContent}
    </div>
  )
}

export default CardHeader
