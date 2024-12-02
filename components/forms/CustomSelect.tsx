/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
}

const CustomSelect = ({
  label = '',
  placeholder = '',
  data = [],
  onChange,
  value,
  description,
  name,
  defaultValue
}: SelectProps) => {
  return (
    <div className="w-full flex space-y-2 flex-col">
      <div>
        {label && (
          <p className="font-semibold text-slate-700 capitalize text-[14px] ">{label}</p>
        )}

        {description && (
          <p className=" text-[12px] text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <Select
        onValueChange={(e) => {
          onChange(e)
        }}
        value={value}
        name={name}
      >
        <SelectTrigger className="w-full shadow-none focus:ring-1 focus:ring-slate-200 border-slate-200 p-4 outline-none rounded-lg focus-within:ring-1 focus-within:ring-slate-200">
          <SelectValue placeholder={placeholder} className='text-slate-500 text-[12px]' />
        </SelectTrigger>
        <SelectContent className='shadow-none' >
          <SelectGroup>
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

export default CustomSelect
