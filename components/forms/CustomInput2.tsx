/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useController, useFormContext } from 'react-hook-form'

interface CustomInputProps {
  name: string
  label?: string
  placeholder?: string
  value?: string
  type?: string
  description?: string
  defaultValue?: string
  onChange?: (value: any) => void
}

const CustomInput2 = ({
  description,
  label,
  placeholder,
  type = 'text',
  name,
  defaultValue = ''
}: CustomInputProps) => {
  const { control } = useFormContext()
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  return (
    <div className="w-full flex flex-col space-y-2">
      <div>
        {label && (
          <p className="text-slate-700 font-bold text-[14px] ">{label}</p>
        )}
        {description && (
          <p className="text-slate-500 text-[12px]">{description}</p>
        )}
      </div>
      <input
        className="border border-slate-200 p-2 rounded-lg flex-grow text-[12px] "
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <div className="h-2">
          <div className="text-red-500 text-[12px] "> {error?.message} </div>
        </div>
      )}
    </div>
  )
}

export default CustomInput2
