/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useCallback, useId, useState } from 'react'
import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [idNo, setIDNo] = useState('')
  const [county, setCounty] = useState('')
  const [password, setPassword] = useState('')

  const { data } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()

  const countiesOption = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.countyName
    }))
  }, [data])

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
        <CustomInput label="DOB" value={dob} onChange={setDOB}
        type='date'
        />
        <CustomSelect
          label="Select Gender"
          value={gender}
          onChange={setGender}
          data={[
            {
              id: '1', label: 'MALE'
            },
            {
              id: '2', label: 'FEMALE'
            }
          ]}
        />
        <CustomInput label="ID No." value={idNo} onChange={setIDNo} />
        <CustomSelect
          label="Select County"
          value={county}
          onChange={setCounty}
          data={countiesOption()}
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

export default AddUser
