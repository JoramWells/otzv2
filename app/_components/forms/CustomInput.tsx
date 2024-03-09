export interface InputEventProps extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string
    name?: string
  }
}

interface CustomInputProps {
  label: string
  placeholder?: string
  value?: string
  type?: string
  onChange: (value: any) => void
}

const CustomInput = ({ label, placeholder, value, type = 'text', onChange }: CustomInputProps) => {
  return (
    <div className="w-full">
      <p className="mb-1 text-slate-800 font-bold">{label}</p>
      <input
        className="border border-gray-200
            p-2 w-full rounded-lg
            "
            value={value}
            type={type}
            onChange={(e: InputEventProps) => { onChange(e.target.value) }}
      />
    </div>
  )
}

export default CustomInput
