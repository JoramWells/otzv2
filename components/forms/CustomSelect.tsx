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
        <SelectTrigger className="w-full shadow-none border-slate-200 p-4 rounded">
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
