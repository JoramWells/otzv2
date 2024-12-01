/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label?: string
  description?: string
  value: string
  placeholder?: string
  defaultValue?: string
  name?: string
  onChange: (value: any) => void
  data: DataItem[]
  paramValue: string
}

const CustomSelectParams = ({
  label = '',
  placeholder = '',
  data = [],
  onChange,
  value,
  description,
  name,
  defaultValue,
  paramValue
}: SelectProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  )

  const pathname = usePathname()

  const handleClick = (term: string) => {
    params.set(paramValue, term)
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="w-full flex space-y-2 flex-col">
      <Select
        onValueChange={(e) => {
          handleClick(e)

          onChange(e)
        }}
        value={value}
        name={name}
      >
        <SelectTrigger className="w-full shadow-none border-slate-200 p-4 rounded-lg h-8">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='shadow-none' >
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {data.length === 0
              ? (
              <SelectItem value="No Data">No Data</SelectItem>
                )
              : (
              <>
                {data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </>
                )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CustomSelectParams
