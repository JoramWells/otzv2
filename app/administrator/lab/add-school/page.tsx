/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useState } from 'react'

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

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
        <CustomInput label="School Name" value={schoolName} onChange={setSchoolName} />
        <CustomInput
          label="Location"
          value={location}
          onChange={setLocation}
        />
        <CustomInput label="Description" value={description} onChange={setDescription} />

        <Button colorScheme="teal" width={'full'}>
          Add School
        </Button>
      </div>
    </div>
  )
}

export default AddSchool
