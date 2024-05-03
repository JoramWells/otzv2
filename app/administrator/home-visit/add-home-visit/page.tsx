/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useId, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'

const AddHomeVisit = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [idNo, setIDNo] = useState('')
  const [residence, setResidence] = useState('')
  const [password, setPassword] = useState('')

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
        <div
        className='flex flex-row gap-x-2'
        >
          <CustomInput
            label="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <CustomInput
            label="Second Name"
            value={middleName}
            onChange={setMiddleName}
          />
          <CustomInput
            label="Last Name"
            value={lastName}
            onChange={setLastName}
          />
        </div>
        <CustomInput label="DOB" value={dob} onChange={setDOB} />
        <CustomInput
          label="Select Gender"
          value={gender}
          onChange={setGender}
        />
        <CustomInput label="ID No." value={idNo} onChange={setIDNo} />
        <CustomInput
          label="Select Residence"
          value={residence}
          onChange={setResidence}
        />

        {/* <CustomSelect
          label="Select Location"
          data={[
            {
              id: useId(),
              label: 'Nanyuki'
            }
          ]}
        /> */}

        <CustomInput label="Password" value={password} onChange={setPassword} />

        <Button colorScheme="teal" width={'full'}>
          Add Patient
        </Button>
      </div>
    </div>
  )
}

export default AddHomeVisit
