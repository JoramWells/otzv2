/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { Input } from '@/components/ui/input'

interface CustomInputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: string
  description?: string
  onChange: (value: any) => void
}

const CustomTimeInput2 = ({ label, onChange, value, description }: CustomInputProps) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {label && (
        <p className="text-slate-700 font-bold text-[14px] ">{label}</p>
      )}
      {description && (
        <p className="mb-1 text-slate-500 text-[12px]">{description}</p>
      )}
      <Input
        type="time"
        className="shadow-none"
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={value}
      />
    </div>
  )
}

export default CustomTimeInput2
