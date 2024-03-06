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
  onChange: (value: any) => void
}

const CustomInput = ({ label, placeholder, value, onChange }: CustomInputProps) => {
  return (
    <div className="w-full">
      <p className="mb-1 text-slate-800 font-bold">{label}</p>
      <input
        className="border border-gray-200
            p-2 w-full rounded-lg
            "
            value={value}
            onChange={(e: InputEventProps) => { onChange(e.target.value) }}
      />
    </div>
  )
}

export default CustomInput
