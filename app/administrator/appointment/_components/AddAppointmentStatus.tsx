/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@/components/ui/button'
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
      <div
        className="w-1/4 flex flex-col items-center bg-white
      justify-center rounded-lg p-4 gap-y-4 "

      >
        <CustomInput
          label="Status Description"
          value={statusDescription}
          onChange={setStatusDescription}
        />

        <Button
          // colorScheme="teal"
          // width={'full'}
          // onClick={() => addAppointmentStatus(inputValues)}
          // isLoading={isLoading}
          className='w-full shadow-none text-emerald-600 border-teal-200'
          variant={'outline'}
        >
          Add New
        </Button>
      </div>
  )
}

export default AddAppointmentStatus
