/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Badge } from '@/components/ui/badge'

interface CategoryListProps {
  id: number
  label: string
  count?: number
}

export interface CustomTabProps {
  categoryList: CategoryListProps[]
  value: string | null
  setValue: (val: string) => void
}

const CustomTab = ({ categoryList, setValue, value }: CustomTabProps) => {
  // check user
  const isChecked = useCallback(
    (params: string) => {
      if (value === params) {
        return true
      }
      return false
    },
    [value]
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const tab = params.get('tab')
  const handleClick = (term: string) => {
    setValue(term)

    params.set('tab', term.toLowerCase())
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <nav
      className="flex flex-row space-x-2 bg-white p-2  w-full
      "
    >
      {categoryList.map((item) => (
        <Button
        type='button'
        size={'sm'}
          key={item.id}
          className={`shadow-none bg-slate-50 rounded-full text-slate-400 font-semibold 
          ${
            isChecked(item.label.toLowerCase()) &&
            'text-teal-600 font-semibold bg-teal-50'
          } hover:bg-slate-100
          `}
          onClick={() => {
            handleClick(item.label.toLowerCase())
          }}
        >
          <span
          className='text-[12px]'
          >{item.label}</span>
          {/* <Badge
            className={`ml-2 text-[12px] shadow-none ${
              isChecked(item.label.toLowerCase()) && 'bg-white'
            } `}
          > */}
          <span
          className='ml-2 text-[12px] '
          >{item.count}</span>
          {/* </Badge> */}
        </Button>
      ))}
    </nav>
  )
}

export default CustomTab
