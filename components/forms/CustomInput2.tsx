/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useController, useFormContext } from 'react-hook-form'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

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
  const [isShowPassword, setIsShowPassword] = useState(false)

  const { control } = useFormContext()
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  //
  const togglePassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  return (
    <div className='w-full'>
      <div className="w-full flex flex-col space-y-1 relative">
        <div>
          {label && (
            <p className="text-slate-800 font-semibold text-[14px] ">{label}</p>
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

        {type === 'password' && (
          <Button
            size={'sm'}
            variant={'ghost'}
            className="absolute right-0 bottom-0.5 hover:bg-slate-100 p-2 hover:cursor-pointer"
            onClick={togglePassword}
          >
            {isShowPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        )}
      </div>
      {error?.message && (
          <p className="text-red-500 text-[12px] mt-2 "> {error?.message}* </p>
      )}
    </div>
  )
}

export default CustomInput2
