/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useCallback, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useAddUserMutation } from '@/api/users/users.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [idNo, setIDNo] = useState('')
  const [county, setCounty] = useState('')
  // const [password, setPassword] = useState('')
  const [phone_no, setPhone_no] = useState('')
  const [email, setEmail] = useState('')

  const inputValues = {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    idNo,
    county,
    email,
    phone_no
    // password
  }

  const [addUser, { isLoading }] = useAddUserMutation()

  const { data } = useGetAllCountiesQuery()
  // const { data: subCountyData } = useGetAllSubCountiesQuery()

  const countiesOption = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.countyName
    }))
  }, [data])

  return (
    <div className="p-3">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col rounded-lg p-5 gap-y-4"
        style={{
          width: '55%'
        }}
      >
        <h1 className="text-xl">Personal Details</h1>

        <div className="flex flex-row gap-x-2">
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
        <CustomInput label="DOB" value={dob} onChange={setDOB} type="date" />
        <CustomSelect
          label="Select Gender"
          value={gender}
          onChange={setGender}
          data={[
            {
              id: '1',
              label: 'MALE'
            },
            {
              id: '2',
              label: 'FEMALE'
            }
          ]}
        />
        <CustomInput label="ID No." value={idNo} onChange={setIDNo} />
        <CustomInput
          label="Phone No."
          value={phone_no}
          onChange={setPhone_no}
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

        {/* <CustomInput label="Password" value={password} onChange={setPassword} /> */}
      </div>

      <div
        className="border border-gray-200
        w-1/3 flex flex-col rounded-lg p-5 gap-y-4 mt-4"
        style={{
          width: '55%'
        }}
      >
        <h1 className="text-xl">Contact and Location</h1>
        <CustomInput label="Email Address" value={email} onChange={setEmail} />
        <CustomSelect
          label="Select County"
          value={county}
          onChange={setCounty}
          data={countiesOption()}
        />
        <Button
          // colorScheme="teal"
          // width={'full'}
          disabled={isLoading}
          className="bg-teal-600 hover:bg-teal-700"
          size={'lg'}
          onClick={() => addUser(inputValues)}
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Save
        </Button>
      </div>
    </div>
  )
}

export default AddUser
