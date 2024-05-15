/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label?: string
  value: string
  placeholder?: string
  defaultValue?: string
  onChange: (value: any) => void
  data: DataItem[]
}

const CustomSelect = ({
  label = '',
  placeholder = '',
  data = [],
  onChange,
  value,
  defaultValue
}: SelectProps) => {
  return (
    <div className="w-full flex space-y-2 flex-col">
      {label && <p className="font-semibold text-slate-700 text-[14px] ">{label}</p>}
      <Select
        onValueChange={(e) => {
          onChange(e)
        }}
        value={value}
      >
        <SelectTrigger className="w-full shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
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
