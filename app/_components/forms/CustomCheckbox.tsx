import { Checkbox } from '@chakra-ui/react'
import React, { type ChangeEvent } from 'react'

export interface CheckboxProps {
  onChange: (checked: boolean) => void
  value: boolean
  label: string
  description?: string
}

const CustomCheckbox = ({ onChange, value, label, description }: CheckboxProps) => {
  return (
    <div>
      <Checkbox
        isChecked={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.checked)
        }}
        fontWeight={'bold'}
        textColor={'gray.700'}
      >
        {label}
      </Checkbox>
      <p className="ml-6 text-slate-500 text-sm">
        {description}
      </p>
    </div>
  )
}

export default CustomCheckbox
