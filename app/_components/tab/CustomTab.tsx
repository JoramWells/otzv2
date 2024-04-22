/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface CategoryListProps {
  id: number
  label: string
}

export interface CustomTabProps {
  categoryList: CategoryListProps[]
  value: string | null
  setValue: (val: string) => void
}

const CustomTab = ({ categoryList, setValue, value }: CustomTabProps) => {
  // check user
  const isChecked = useCallback((params: string) => {
    if (value === params) {
      return true
    }
    return false
  }, [value])

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
    <div
      className="flex flex-row space-x-4
      border-b mb-4 border-slate-200 w-full
      "
    >
      {categoryList.map((item) => (
        <Button
          key={item.id}
          className={`shadow-none bg-white text-slate-400 font-semibold ${isChecked(item.label.toLowerCase()) && 'text-teal-600 font-semibold border-b-2 border-teal-600'}
          hover:bg-slate-100 rounded-none
          `}
          onClick={() => {
            handleClick(item.label.toLowerCase())
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTab
