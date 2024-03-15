import { Checkbox } from '@chakra-ui/react'
import React from 'react'

interface MicroScopyCheckboxProps {
  label: string
  description: string
}

const MicroScopyCheckbox = ({ label, description }: MicroScopyCheckboxProps) => {
  return (
    <div>
      <Checkbox
        className="font-bold"
        size={'lg'}
        _checked={{
          color: 'black'
        }}
      >
      </Checkbox>
      <p className="ml-7 text-slate-500 text-sm">
        Presence in light sediment by light microscopy test
      </p>
    </div>
  )
}

export default MicroScopyCheckbox
