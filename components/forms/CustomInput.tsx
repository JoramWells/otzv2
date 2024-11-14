/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type InputEventProps, type CustomInputProps } from '@/types'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

const CustomInput = ({ description, label, name, placeholder, value, type = 'text', onChange, defaultValue }: CustomInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const togglePassword = () => {
    setIsShowPassword(prev => !prev)
  }

  const handleChange = (e: InputEventProps) => {
    if (type === 'file') {
      onChange(e.target.files?.[0] ?? null)
    } else {
      onChange(e.target.value)
    }
  }

  return (
    <div className="w-full flex flex-col space-y-2 relative">
      <div>
        {label && (
          <p className="text-slate-700 font-semibold text-[14px] capitalize">
            {label}
          </p>
        )}
        {description && (
          <p className="text-slate-500 text-[12px]">{description}</p>
        )}
      </div>
      <input
        className="border border-slate-200 p-2  rounded flex-grow text-[12px] focus:border-teal-500 active:border-teal-500 "
        placeholder={placeholder}
        value={value}
        name={name}
        defaultValue={defaultValue}
        type={isShowPassword ? 'text' : type}
        onChange={handleChange}
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
  )
}

export default CustomInput
