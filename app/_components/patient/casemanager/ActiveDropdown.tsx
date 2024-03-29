/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import {
  ChevronDownIcon
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu'

const data = [
  {
    id: '1',
    label: 'All'
  },
  {
    id: '2',
    label: 'Active'
  }
]

export function ActiveDropdown () {
  // const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {data.map((column) => {
          return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
              >
                {column.label}
              </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
