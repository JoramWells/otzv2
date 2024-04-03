/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useState } from 'react'
import { useAddArtSwitchReasonMutation } from '@/api/art/artSwitchReason.api'

const AddArt = () => {
  const [reason, setReason] = useState('')
  const [addArtSwitchReason, { isLoading }] = useAddArtSwitchReasonMutation()

  const inputValues = {
    reason
  }

  return (
    <div className="flex flex-row justify-center">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-14"
        style={{
          width: '40%'
        }}
      >
        <CustomInput label="Reason" value={reason} onChange={setReason} />

        <Button
          colorScheme="teal"
          width={'full'}
          onClick={() => addArtSwitchReason(inputValues)}
          isLoading={isLoading}
        >
          Add Phase
        </Button>
      </div>
    </div>
  )
}

export default AddArt
