/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useEffect, useState } from 'react'
import { useDeletePatientMutation, useGetPatientQuery, useUpdatePatientMutation } from '@/api/patient/patients.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface InputProps {
  value: string
  setValue: (e: string) => void
}

const SelectYears = ({ value, setValue }: InputProps) => {
  // const [value, setValue] = useState()
  return (
    <Select
    onValueChange={e => { setValue(e) }}
    value={value}
    >
      <SelectTrigger className="shadow-none">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          <SelectItem value="clinician">Clinician</SelectItem>
          <SelectItem value="mentor mother">Mentor Mother</SelectItem>
          <SelectItem value="ayp advocate">AYP Advocate</SelectItem>
          <SelectItem value="nurse">Nurse</SelectItem>
          <SelectItem value="patient">Patient</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const ProfileSettings = ({ params }: { params: any }) => {
  const [phoneNo, setPhoneNo] = useState<string | undefined>('')
  const [firstName, setFirstName] = useState<string | undefined>('')
  const [middleName, setMiddleName] = useState<string | undefined>('')
  const [lastName, setLastName] = useState<string | undefined>('')
  const [role, setRole] = useState('')
  const { patientID } = params

  const { data: patientProfileData } = useGetPatientQuery(patientID)
  const [updatePatient, { isLoading }] = useUpdatePatientMutation()

  const [deletePatient, { isLoading: isLoadingDeletePatient }] = useDeletePatientMutation()

  useEffect(() => {
    if (patientProfileData) {
      setPhoneNo(patientProfileData.phoneNo)
      setFirstName(patientProfileData.firstName)
      setMiddleName(patientProfileData.middleName)
      setLastName(patientProfileData.lastName)
      setRole(patientProfileData.role)
    }
  }, [patientProfileData])

  const inputValues = {
    id: patientID,
    firstName,
    middleName,
    lastName,
    phoneNo,
    role
  }

  console.log(patientProfileData, 'patientProfileData')

  return (
    <>
      <div className="p-2 ">
        <div className="w-1/2 flex flex-col space-y-4 bg-white rounded-lg">
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

          <CustomInput label="Phone" value={phoneNo!} onChange={setPhoneNo} />

          {/*  */}
          <SelectYears setValue={setRole} value={role} />

          <div className="flex space-x-4">
            <Button
              disabled={isLoading}
              onClick={async () => await updatePatient(inputValues)}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={15} />}
              Save Changes
            </Button>
            <Button
              disabled={isLoading}
              onClick={async () => await deletePatient(patientID)}
            >
              {isLoadingDeletePatient && <Loader2 className="animate-spin mr-2" size={15} />}
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfileSettings
