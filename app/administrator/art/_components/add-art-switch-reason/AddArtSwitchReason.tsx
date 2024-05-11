/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useAddArtSwitchReasonMutation } from '@/api/art/artSwitchReason.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'

const AddArtSwitchReason = () => {
  const [reason, setReason] = useState('')
  const [addArtSwitchReason, { isLoading }] = useAddArtSwitchReasonMutation()

  const inputValues = {
    reason
  }

  return (
      <div
        className="bg-white   flex flex-col items-center
      justify-center rounded-lg p-4 gap-y-4"
        >
        <CustomInput label="Reason" value={reason} onChange={setReason} />

        <Button
          // colorScheme="teal"
          // width={'full'}
          className='w-full shadow-none bg-slate-200 hover:bg-slate-100 text-slate-700'
          onClick={() => addArtSwitchReason(inputValues)}
          disabled={isLoading}
        >
          Add Phase
        </Button>
      </div>
  )
}

export default AddArtSwitchReason
