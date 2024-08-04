import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'

interface FormErrorProps {
  message?: string
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="p-2 bg-red-50 rounded-lg text-red-500 flex flex-row space-x-2 items-center">
      <ExclamationTriangleIcon />
      <p
      className='font-semibold'
      >{message}</p>
    </div>
  )
}

export default FormError
