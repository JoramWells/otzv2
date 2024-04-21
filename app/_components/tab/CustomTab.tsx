/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { type InputTabProps } from '../patient/tab/PatientDetailsContent'

interface CategoryListProps {
  id: number
  label: string
}

export interface CustomTabProps {
  categoryList: CategoryListProps[]
  value: {
    id: number
    params?: string
  }
  setValue: (val: InputTabProps) => void
}

const CustomTab = ({ categoryList, setValue, value }: CustomTabProps) => {
  // check user
  const isChecked = useCallback((val: number, params: string) => {
    if (value.id === val || value.params?.toLowerCase() === params) {
      return true
    }
    return false
  }, [value])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const tab = params.get('tab')
  const handleClick = (id: number, term: string) => {
    setValue({ id, params: term })

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
          className={`shadow-none bg-white text-slate-400 font-semibold ${isChecked(item.id, item.label.toLowerCase()) && 'text-teal-600 font-semibold border-b-2 border-teal-600'}
          hover:bg-slate-100 rounded-none
          `}
          onClick={() => {
            handleClick(item.id, item.label)
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTab
