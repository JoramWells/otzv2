'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useState } from 'react'

const AddUser = () => {
  const [occupationDescription, setOccupation] = useState('')
  const inputValues = {
    occupationDescription
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
          value={occupationDescription}
          onChange={setOccupation}
        />

        <Button colorScheme="teal" width={'full'}>
          Add Occupation
        </Button>
      </div>
    </div>
  )
}

export default AddUser
