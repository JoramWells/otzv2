/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { useAddVLJustificationMutation } from '@/api/viraload/vlJustification.api'
import { Loader2 } from 'lucide-react'

const AddVLJustification = () => {
  const [justification, setJustification] = useState('')

  const [addVLJustification, { isLoading }] =
    useAddVLJustificationMutation()

  const inputValues = {
    justification

  }

  return (
      <div
        className="bg-white
        flex flex-col items-center
      justify-center rounded-lg p-4 gap-y-4 w-1/4"
       >
        <CustomInput
          label="Justification"
          placeholder='Enter reason'
          value={justification}
          onChange={setJustification}
        />

        <Button
        className='w-full shadow-none text-black'
          // colorScheme="teal"
          // width={'full'}
          size={'sm'}
          variant={'outline'}
          onClick={() => addVLJustification(inputValues)}
          disabled={isLoading}
        >
          {isLoading && <Loader2 size={16} className='mr-2 animate-spin' />}
          Save
        </Button>
      </div>
  )
}

export default AddVLJustification
