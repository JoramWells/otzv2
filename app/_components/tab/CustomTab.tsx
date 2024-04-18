import { Button } from '@/components/ui/button'
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
            setValue(item.id)
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default CustomTab
