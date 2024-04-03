/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useState } from 'react'
import { useAddHomeVisitFrequencyMutation } from '@/api/homevisit/homeVisitFrequency.api'

const AddHomeVisitReason = () => {
  const [homeVisitFrequencyDescription, setHomeVisitFrequencyDescription] = useState('')
  const [addHomeVisitFrequency, { isLoading }] = useAddHomeVisitFrequencyMutation()
  const inputValues = {
    homeVisitFrequencyDescription
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
          value={homeVisitFrequencyDescription}
          onChange={setHomeVisitFrequencyDescription}
        />

        <Button colorScheme="teal" width={'full'}
        isLoading={isLoading}
        onClick={() => addHomeVisitFrequency(inputValues)}
        >
          Frequency of Visit
        </Button>
      </div>
    </div>
  )
}

export default AddHomeVisitReason
