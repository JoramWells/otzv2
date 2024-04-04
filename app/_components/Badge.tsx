import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
}

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <div
      className={`bg-${color}-500 inline-block text-white
  w-relative font-bold p-[0.2rem] flex-shrink-0 flex-grow-0 text-xs
  `}
    >
      {children}
    </div>
  )
}

export default Badge
