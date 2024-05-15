import { Users } from 'lucide-react'
import { type ReactNode } from 'react'

export interface HeaderCategoriesProps {
  id: string
  title: string
  icon: ReactNode
  count: string
  description: string
}

const HeaderCategories = ({ id, count, description, title, icon }: HeaderCategoriesProps) => {
  return (
    <div
      className="rounded-lg p-4
      h-[110px] flex-1 flex flex-col bg-white
      "
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold">{title} </h1>
        <Users size={20} />
      </div>
      <p className="text-2xl font-bold">45, 894</p>
      <p className="text-slate-500 text-sm">Since last month</p>
    </div>
  )
}

export default HeaderCategories
