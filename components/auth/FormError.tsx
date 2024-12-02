import { TriangleAlert, X } from 'lucide-react'
import React, { type Dispatch, type SetStateAction } from 'react'

interface FormErrorProps {
  message?: string
  setError: Dispatch<SetStateAction<string | undefined>>
}

const FormError = ({ message, setError }: FormErrorProps) => {
  return (
    <div className="p-2 bg-red-50 rounded-lg border border-red-200 text-red-500 flex flex-row space-x-2 items-center justify-between">
      <div
      className='flex flex-row space-x-2 items-center'
      >
        <TriangleAlert size={16} />
        <p className="text-[12px]">{message}</p>
      </div>
      <X size={16} className='text-red-500' onClick={() => setError('')} />
    </div>
  )
}

export default FormError
