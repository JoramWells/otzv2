/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useCallback, useState } from 'react'

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const AddAppointmentStatus = () => {
  const [statusDescription, setStatusDescription] = useState('')

  // const [addAppointmentStatus, { isLoading }] =
  //   useAddAppointmentStatusMutation()

  const inputValues = {
    statusDescription
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
          label="Status Description"
          value={statusDescription}
          onChange={setStatusDescription}
        />

        <Button
          colorScheme="teal"
          width={'full'}
          // onClick={() => addAppointmentStatus(inputValues)}
          // isLoading={isLoading}
        >
          Appointment Status
        </Button>
      </div>
    </div>
  )
}

export default AddAppointmentStatus
