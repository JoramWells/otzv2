/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input } from '@/components/ui/input'

export interface InputEventProps extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string
    name?: string
  }
}

interface CustomInputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: string
  description?: string
  onChange: (value: any) => void
}

const CustomInput = ({ description, label, placeholder, value, type = 'text', onChange }: CustomInputProps) => {
  return (
    <div className="w-full">
      {label && <p className="text-slate-800 font-bold">{label}</p>}
      {description && (
        <p className="mb-1 text-slate-500 text-sm">{description}</p>
      )}
      <Input
        className="border border-gray-200
            p-2 w-full rounded-lg shadow-none
            "
        value={value}
        type={type}
        onChange={(e: InputEventProps) => {
          onChange(e.target.value)
        }}
      />
    </div>
  )
}

export default CustomInput
