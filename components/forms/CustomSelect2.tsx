/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useController, useFormContext } from 'react-hook-form'

interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label?: string
  placeholder?: string
  defaultValue?: string
  name: string
  // onChange: (value: any) => void
  data: DataItem[]
}

const CustomSelect2 = ({
  label = '',
  placeholder = '',
  data = [],
  name,
  defaultValue
}: SelectProps) => {
  const { control } = useFormContext()
  const {
    field: { onChange, onBlur, value, ref }
    // fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: ''
  })
  return (
    <div className="w-full flex space-y-2 flex-col">
      {label && (
        <p className="font-semibold text-slate-700 text-[14px] ">{label}</p>
      )}
      <Select onValueChange={onChange} value={value} name={name}>
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
                  <SelectItem key={item.id} value={item.id} ref={ref}
                  onBlur={onBlur}
                  >
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

export default CustomSelect2
