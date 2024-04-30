import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface DataProps {
  id: string
  label: string
  link: string
}

interface DataListProps {
  dataList: DataProps[]
}

export function MenuSelect ({ dataList }: DataListProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="text-slate-500" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none shadow-slate-200">
        {dataList.map((item) => (
          <DropdownMenuItem key={item.id}>
            <Link
            href={item.link}
            >{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
