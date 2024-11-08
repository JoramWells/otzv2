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
          type="button"
          size={'sm'}
          key={item.id}
          className={`shadow-none bg-slate-50 border border-slate-200 rounded-full text-slate-400 font-semibold 
          ${
            isChecked(item.label.toLowerCase()) &&
            'text-teal-600 font-semibold bg-teal-50 border-teal-200'
          } hover:bg-slate-100
          `}
          onClick={() => {
            handleClick(item.label.toLowerCase())
          }}
        >
          <span className="text-[12px]">{item.label}</span>
          {/* <Badge
            className={`ml-2 text-[12px] shadow-none ${
              isChecked(item.label.toLowerCase()) && 'bg-white'
            } `}
          > */}
          {item.count != null && (
            <div
            className='border border-slate-100 bg-slate-50 overflow-hidden pl-2 pr-2 pt-0.5 text-center ml-2 pb-0.5 rounded-full flex items-center justify-center flex-row'
            >
              <p className="text-[10px] rounded-full ">{item.count}</p>
            </div>
          )}

          {/* </Badge> */}
        </Button>
      ))}
    </nav>
  )
}

export default CustomTab
