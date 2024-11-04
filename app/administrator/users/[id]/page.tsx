/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import { useAddPatientMutation } from '@/api/patient/patients.api'
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from '@/api/users/users.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import moment from 'moment'
import { type UserInterface } from 'otz-types'
import { useCallback, useEffect, useState } from 'react'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: '/dashboard'
  }
]
const UserDetailPage = ({ params }: { params: any }) => {
  const { id } = params

  const [user, setUser] = useState<UserInterface>()
  const [phoneNo, setPhoneNo] = useState<string | undefined>('')
  const [firstName, setFirstName] = useState<string | undefined>('')
  const [middleName, setMiddleName] = useState<string | undefined>('')
  const [dob, setDOB] = useState<Date | string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>('')
  const [populationType, setPopulationType] = useState<string | undefined>('')
  const [hospitalID, setHospitalID] = useState<string>()
  const [role, setRole] = useState('')

  const inputValues = {
    id,
    firstName,
    middleName,
    lastName,
    phoneNo,
    populationType,
    dob,
    hospitalID
  }

  const { data: hospitalsData } = useGetAllHospitalsQuery()

  const hospitalOptions = useCallback(() => {
    return hospitalsData?.map((item: any) => ({
      id: item?.id,
      label: item?.hospitalName
    }))
  }, [hospitalsData])

  const { data: userData } = useGetUserQuery(id as string)

  const [updateUser, { isLoading: isLoadingAddUser }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation()
  useEffect(() => {
    if (userData != null) {
      setUser(userData)
    }
  }, [userData])
  const [addPatient, { isLoading, data, error }] = useAddPatientMutation()
  useEffect(() => {
    if (userData) {
      setPhoneNo(userData.phoneNo)
      setFirstName(userData.firstName)
      setMiddleName(userData.middleName)
      setLastName(userData.lastName)
      setHospitalID(userData.hospitalID)
      setDOB(moment(userData.dob).format('YYYY-MM-DD'))
    }
  }, [userData])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-4">
        <Button
          size={'sm'}
          onClick={async () =>
            await addPatient({
              ...user,
              role: 'clinician',
              sex: 'M',
              userID: user?.id
            })
          }
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
          Create User
        </Button>
      </div>
      <div className="w-1/2 p-4 flex flex-col space-y-4 bg-white rounded-lg">
        <CustomInput
          label="First Name"
          value={firstName!}
          onChange={setFirstName}
        />

        <CustomInput
          label="Second Name"
          value={middleName!}
          onChange={setMiddleName}
        />
        <CustomInput
          label="Last Name"
          value={lastName!}
          onChange={setLastName}
        />

        <CustomInput
          label="Date of Birth"
          type="date"
          value={dob as unknown as string}
          onChange={setDOB}
        />

        <CustomInput label="Phone" value={phoneNo!} onChange={setPhoneNo} />

        {/*  */}
        {/* <SelectYears setValue={setRole} value={role} /> */}
        {/* <CustomSelect
          label="Role"
          data={roleData}
          onChange={setRole}
          value={role}
        /> */}

        {/*  */}
        {/* <CustomSelect
          label="Key Population"
          value={populationType!}
          onChange={setPopulationType}
          data={kpData}
        /> */}

        <CustomSelect
          label="Select hospital name"
          onChange={setHospitalID}
          value={hospitalID!}
          data={hospitalOptions()}
        />

        <div className="flex pt-4 space-x-4 justify-end border-t mt-2">
          <Button
            disabled={isLoadingDeleteUser}
            onClick={async () => await deleteUser(id)}
            size={'sm'}
            className="bg-red-50 text-red-500 hover:bg-red-100"
          >
            {isLoadingDeleteUser && (
              <Loader2 className="animate-spin mr-2" size={15} />
            )}
            Delete
          </Button>
          <Button
            disabled={isLoadingAddUser}
            onClick={async () => await updateUser(inputValues)}
            size={'sm'}
          >
            {isLoadingAddUser && <Loader2 className="animate-spin mr-2" size={15} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
