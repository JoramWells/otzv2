import { Checkbox } from '@chakra-ui/react'
import React, { type ChangeEvent } from 'react'

export interface CheckboxProps {
  onChange: (checked: boolean) => void
  value: boolean
  label: string
}

const CustomCheckbox = ({ onChange, value, label }: CheckboxProps) => {
  return (
    <Checkbox
      isChecked={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked)
      }}
    >
      {label}
    </Checkbox>
  )
}

export default CustomCheckbox
