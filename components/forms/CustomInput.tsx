/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type InputEventProps, type CustomInputProps } from '@/types'

const CustomInput = ({ description, label, placeholder, value, type = 'text', onChange }: CustomInputProps) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {label && (
        <p className="text-slate-700 font-bold text-[14px] ">{label}</p>
      )}
      {description && (
        <p className="mb-1 text-slate-500 text-[12px]">{description}</p>
      )}
      <input
        className="border border-gray-200 p-2 rounded flex-grow"
        placeholder={placeholder}
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
