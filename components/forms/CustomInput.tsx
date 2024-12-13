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
    <div className="w-full flex flex-col space-y-1 relative">
      <div>
        {label && (
          <p className="text-slate-800 font-semibold text-[14px] capitalize">
            {label}
          </p>
        )}
        {description && (
          <p className="text-slate-500 text-[12px]">{description}</p>
        )}
      </div>
      <input
        className="p-2 border border-slate-200 focus:bg-slate-50  rounded-lg flex-grow text-[12px] focus:border-slate-200 active:border-slate-200
        focus-within:ring-1 focus-within:ring-slate-200 outline-none
        "
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
          {isShowPassword ? <Eye size={16} className='text-teal-500' /> : <EyeOff size={16} className='text-slate-500' />}
        </Button>
      )}
    </div>
  )
}

export default CustomInput
