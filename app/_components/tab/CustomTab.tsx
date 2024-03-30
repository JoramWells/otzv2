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
      border-b mb-4
      "
    >
      {categoryList.map((item) => (
        <Button
          key={item.id}
          className={`shadow-none font-bold bg-white text-slate-500 ${isChecked(item.id) && 'text-teal-600 border-b-2 border-teal-600'}
          hover:bg-slate-100 rounded-none
          `}
          // rounded={'0'}
          // h={10}
          // size={'sm'}
          // w={'full'}
          // borderBottom={`${value === item.id ? '2px' : '0'}`}
          // fontWeight={`${value === item.id ? 'bold' : 'normal'}`}
          // bgColor={`${value === item.id ? 'teal.50' : 'transparent'}`}
          // color={`${value === item.id ? 'teal' : 'gray.500'}`}
          // bgColor={'white'}
          // shadow={`${value === item.id && 'md'}`}
          // _hover={
          //   {
          // bgColor: `${value === item.id && 'black'}`,
          // color: `${value === item.id && 'white'}`
          //   }
          // }
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
