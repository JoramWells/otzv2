import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface CategoryListProps {
  id: number
  label: string
}

export interface CustomTabProps {
  categoryList: CategoryListProps[]
  value: number
  setValue: (val: number) => void
}

const CustomTab = ({ categoryList, setValue, value }: CustomTabProps) => {
  // check user
  const isChecked = useCallback((val: number) => {
    if (value === val) {
      return true
    }
    return false
  }, [value])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const handleClick = (id: number, term: string) => {
    setValue(id)
    const params = new URLSearchParams(searchParams)
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
          className={`shadow-none bg-white text-slate-400 font-semibold ${isChecked(item.id) && 'text-teal-600 font-semibold border-b-2 border-teal-600'}
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
