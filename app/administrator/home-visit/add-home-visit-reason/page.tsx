/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useState } from 'react'
import { useAddHomeVisitReasonMutation } from '@/api/homevisit/homeVisitReason.api'

const AddHomeVisitReason = () => {
  const [homeVisitReasonDescription, setHomeVisitReasonDescription] = useState('')
  const [addHomeVisitReason, { isLoading }] = useAddHomeVisitReasonMutation()
  const inputValues = {
    homeVisitReasonDescription
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
        <CustomInput
          label="Description"
          value={homeVisitReasonDescription}
          onChange={setHomeVisitReasonDescription}
        />

        <Button
          colorScheme="teal"
          width={'full'}
          isLoading={isLoading}
          onClick={() => addHomeVisitReason(inputValues)}
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default AddHomeVisitReason
