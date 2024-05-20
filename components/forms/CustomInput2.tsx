/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Input } from '@/components/ui/input'
import { type CustomInputProps } from '@/types'
import { useController, useFormContext } from 'react-hook-form'

type CustomProps = CustomInputProps & {
  name: string
}

const CustomInput2 = ({ description, label, placeholder, type = 'text', name }: CustomProps) => {
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
      {label && (
        <p className="text-slate-700 font-bold text-[14px] ">{label}</p>
      )}
      {description && (
        <p className="mb-1 text-slate-500 text-[12px]">{description}</p>
      )}
      <Input
        className="border border-gray-200
            p-2 w-full rounded-lg shadow-none
            "
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
      />
      {error && <p>{error.message} </p>}
    </div>
  )
}

export default CustomInput2
