/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useEffect, useState } from 'react'
import { useGetPatientQuery, useUpdatePatientMutation } from '@/api/patient/patients.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const ProfileSettings = ({ params }: { params: any }) => {
  const [phoneNo, setPhoneNo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const { patientID } = params

  const { data: patientProfileData } = useGetPatientQuery(patientID)
  const [updatePatient, { isLoading }] = useUpdatePatientMutation()

  useEffect(() => {
    if (patientProfileData) {
      setPhoneNo(patientProfileData.phoneNo)
      setFirstName(patientProfileData.firstName)
      setMiddleName(patientProfileData.middleName)
      setLastName(patientProfileData.lastName)
    }
  }, [patientProfileData])

  const inputValues = {
    id: patientID,
    firstName,
    middleName,
    lastName,
    phoneNo
  }

  return (
    <>
      <div className="p-2">
        <div className="w-1/2 flex flex-col space-y-4">
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

          <CustomInput label="Phone" value={phoneNo} onChange={setPhoneNo} />
          <div className="flex space-x-4">
            <Button>Save Changes</Button>
            <Button
            disabled={isLoading}
            onClick={async () => await updatePatient(inputValues)}
            >
              {isLoading && <Loader2 className='animate-spin mr-2' size={15} />}
              Delete Account</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfileSettings
