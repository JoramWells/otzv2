import React, { type ReactNode } from 'react'

interface CardHeaderProps {
  header: string
  rightContent?: ReactNode
}

const CardHeader = ({ header, rightContent }: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full border-b bg-slate-50 border-slate-200  p-3  rounded-t-lg">
      <h3 className="text-lg  font-semibold">{header}</h3>
      {rightContent}
    </div>
  )
}

export default CardHeader
