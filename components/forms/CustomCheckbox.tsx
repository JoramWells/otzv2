import { Checkbox } from '@chakra-ui/react'
import React, { type ChangeEvent } from 'react'

export interface CheckboxProps {
  onChange: (checked: boolean) => void
  value: boolean
  label?: string
  description?: string
}

const CustomCheckbox = ({ onChange, value, label, description }: CheckboxProps) => {
  return (
    <div className="flex flex-row items-start space-x-3">
      <Checkbox
        isChecked={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.checked)
        }}
        pt={1}
      />
      <div className='m-0 p-0'>
        <p className="font-bold text-slate-700 m-0">{label}</p>
        <span
          className="text-slate-500 text-sm
        font-normal
        "
        >
          {description}
        </span>
      </div>
    </div>
  )
}

export default CustomCheckbox
