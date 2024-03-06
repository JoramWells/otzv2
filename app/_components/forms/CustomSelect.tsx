import { Select } from '@chakra-ui/react'

interface DataItem {
  id: string
  label: string
}

export interface SelectProps {
  label: string
  data: DataItem[]
}

const CustomSelect = ({ label = 'Label', data = [] }: SelectProps) => {
  return (
    <div className="w-full">
      <p className="mb-1 font-bold text-slate-700">{label}</p>
      <Select placeholder="Select Location">
        {data.map((item) => (
          <option value=""
          key={item.id}
          >{item.label}</option>
        ))}
      </Select>
    </div>
  )
}

export default CustomSelect
