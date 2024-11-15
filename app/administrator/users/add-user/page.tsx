/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useCallback, useEffect, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useAddUserMutation } from '@/api/users/users.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'users',
    link: '/'
  }
]

const roleData = [
  {
    id: 'admin',
    label: 'Admin'
  },
  {
    id: 'clinician',
    label: 'Clinician'
  },
  {
    id: 'mentor mother',
    label: 'Mentor Mother'
  },
  {
    id: 'advocate',
    label: 'Advocate'
  },
  {
    id: 'nurse',
    label: 'Nurse'
  }
]

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [idNo, setIDNo] = useState('')
  const [county, setCounty] = useState('')
  // const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [hospitalID, setHospitalID] = useState<string | undefined>()
  const [role, setRole] = useState('')

  const inputValues = {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    idNo,
    county,
    email,
    phoneNo,
    hospitalID,
    role
    // password
  }

  const [addUser, { isLoading, data: isSavedData }] = useAddUserMutation()
  const router = useRouter()

  useEffect(() => {
    if (isSavedData) {
      router.push('/administrator/users')
    }
  }, [isSavedData, router])
  const { data } = useGetAllCountiesQuery()
  // const { data: subCountyData } = useGetAllSubCountiesQuery()

  const countiesOption = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.countyName
    }))
  }, [data])

  const { data: hospitalsData } = useGetAllHospitalsQuery()

  const hospitalOptions = useCallback(() => {
    return hospitalsData?.map((item: any) => ({
      id: item?.id,
      label: item?.hospitalName
    }))
  }, [hospitalsData])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2">
        <div
          className="border border-gray-200 bg-white
        w-1/3 flex flex-col rounded-lg p-5 gap-y-2"
          style={{
            width: '55%'
          }}
        >
          <h1 className="font-bold text-[16px] ">Personal Details</h1>

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
            value={phoneNo}
            onChange={setPhoneNo}
          />

          <CustomSelect
            label="Role"
            data={roleData}
            onChange={setRole}
            value={role}
          />

          {/* <CustomInput label="Password" value={password} onChange={setPassword} /> */}
        </div>

        <div
          className="border border-gray-200 bg-white
        w-1/3 flex flex-col rounded-lg p-5 gap-y-4 mt-4"
          style={{
            width: '55%'
          }}
        >
          <h1 className="font-bold text-[16px] ">Contact and Location</h1>
          <CustomInput
            label="Email Address"
            value={email}
            onChange={setEmail}
          />
          <CustomSelect
            label="Select County"
            value={county}
            onChange={setCounty}
            data={countiesOption()}
          />
          <CustomSelect
            label="Select hospital name"
            onChange={setHospitalID}
            value={hospitalID as string}
            data={hospitalOptions()}
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
    </div>
  )
}

export default AddUser
