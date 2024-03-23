import { Select } from '@chakra-ui/react'

interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label: string
  value: string
  defaultValue?: string
  onChange: (value: any) => void
  data: DataItem[]
}

const CustomSelect = ({ label = 'Label', data = [], onChange, value, defaultValue }: SelectProps) => {
  return (
    <div className="w-full">
      <p className="mb-1 font-bold text-slate-700">{label}</p>
      <Select
      onChange={e => {
        onChange(e.target.value)
      }}
      value={value}
      placeholder='Select...'
      >
        {data.map((item) => (
          <option
          key={item.id}
          value={item.id}
          defaultValue={defaultValue}
          >{item.label}</option>
        ))}
      </Select>
    </div>
  )
}

export default CustomSelect
