/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import React, { useCallback, useState } from 'react'
import CustomSelect from '../../../_components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import CustomInput from '@/app/_components/forms/CustomInput'
import { Loader2 } from 'lucide-react'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'
import { useAddCaregiverMutation } from '@/api/caregiver/caregiver.api'
import { useGetAllOccupationQuery } from '@/api/occupation.api'

const CaseManager = ({ params }: any) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [idNo, setIDNo] = useState('')
  // const [county, setCounty] = useState('')
  // const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [relationship, setRelationship] = useState('')
  const [locationID, setLocationID] = useState('')
  const [careerID, setCareerID] = useState('')

  const patientID = params.patientID

  const inputValues = {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    idNo,
    locationID,
    email,
    phoneNo,
    patientID
  }

  const [addCaregiver, { isLoading }] = useAddCaregiverMutation()

  const { data } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: occupationData } = useGetAllOccupationQuery()

  const countiesOption = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id,
      label: item.countyName
    }))
  }, [data])

  const occupationOptions = useCallback(() => {
    return occupationData?.map((item: any) => ({
      id: item.id,
      label: item.occupationDescription
    }))
  }, [occupationData])

  return (
    <div className="p-3">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col rounded-lg p-5 gap-y-4"
        style={{
          width: '55%'
        }}
      >
        <h1 className="text-xl font-bold">Care Details</h1>

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

        <CustomSelect
          label="Define Relationship"
          value={relationship}
          onChange={setRelationship}
          data={[
            {
              id: 'Brother',
              label: 'Brother'
            },
            {
              id: 'Sister',
              label: 'Sister'
            },
            {
              id: 'Mother',
              label: 'Mother'
            },
            {
              id: 'Father',
              label: 'Father'
            },
            {
              id: 'Friend',
              label: 'Friend'
            },
            {
              id: 'Spouse',
              label: 'Spouse'
            },
            {
              id: 'Daughter',
              label: 'Daughter'
            },
            {
              id: 'Son',
              label: 'Son'
            },
            {
              id: 'Other',
              label: 'Other'
            }
          ]}
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
      </div>

      <div
        className="border border-gray-200
        w-1/3 flex flex-col rounded-lg p-5 gap-y-4 mt-4"
        style={{
          width: '55%'
        }}
      >
        <h1 className="text-xl font-bold">Contact and Location</h1>
        <CustomInput label="Phone No." value={phoneNo} onChange={setPhoneNo} />
        <CustomInput label="Email Address" value={email} onChange={setEmail} />
        <CustomSelect
          label="Select County"
          value={locationID}
          onChange={setLocationID}
          data={countiesOption()}
        />

        <CustomSelect
          label="Occupation"
          data={occupationOptions()}
          value={careerID}
          onChange={setCareerID}
        />

        <Button
          // colorScheme="teal"
          // width={'full'}
          disabled={isLoading}
          className="bg-teal-600 hover:bg-teal-700"
          size={'lg'}
          onClick={() => addCaregiver(inputValues)}
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Save
        </Button>
      </div>
    </div>
  )
}

export default CaseManager
