import { TriangleAlert } from 'lucide-react'
import React from 'react'

interface FormErrorProps {
  message?: string
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="p-2 bg-red-50 rounded-lg text-red-500 flex flex-row space-x-2 items-center">
      <TriangleAlert size={16} />
      <p
      className='text-[14px]'
      >{message}</p>
    </div>
  )
}

export default FormError
