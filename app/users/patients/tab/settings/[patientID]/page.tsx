/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useEffect, useState } from 'react'
import { useDeletePatientMutation, useGetPatientQuery, useUpdatePatientMutation } from '@/api/patient/patients.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'

import { Loader2 } from 'lucide-react'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import CustomSelect from '@/components/forms/CustomSelect'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const roleData = [
  {
    id: 'clinician',
    label: 'Clinician'
  },
  {
    id: 'mentor mother',
    label: 'Mentor Mother'
  },
  {
    id: 'ayp advocate',
    label: 'AYP Advocate'
  },
  {
    id: 'nurse',
    label: 'Nurse'
  },
  {
    id: 'patient',
    label: 'Patient'
  }
]

const ProfileSettings = ({ params }: { params: any }) => {
  const [phoneNo, setPhoneNo] = useState<string | undefined>('')
  const [firstName, setFirstName] = useState<string | undefined>('')
  const [middleName, setMiddleName] = useState<string | undefined>('')
  const [lastName, setLastName] = useState<string | undefined>('')
  const [populationType, setPopulationType] = useState<string | undefined>('')
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
      setPopulationType(patientProfileData.populationType)
    }
  }, [patientProfileData])

  const inputValues = {
    id: patientID,
    firstName,
    middleName,
    lastName,
    phoneNo,
    role,
    populationType
  }

  console.log(patientProfileData, 'patientProfileData')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 ">
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

          <CustomInput label="Phone" value={phoneNo!} onChange={setPhoneNo} />

          {/*  */}
          {/* <SelectYears setValue={setRole} value={role} /> */}
          <CustomSelect
            label="Role"
            data={roleData}
            onChange={setRole}
            value={role}
          />

          {/*  */}
          <CustomSelect
            label="Key Population"
            value={populationType as string}
            onChange={setPopulationType}
            data={[
              {
                id: 'Fisher Folk',
                label: 'Fisher Folk'
              },
              {
                id: 'FSW',
                label: 'FSW'
              },
              {
                id: 'General Population',
                label: 'General Population'
              },
              {
                id: 'MsM',
                label: 'MsM'
              },
              {
                id: 'PWID',
                label: 'PWID'
              },

              {
                id: 'Truck Drivers',
                label: 'Truck Drivers'
              },

              {
                id: 'TG',
                label: 'TG'
              }
            ]}
          />

          <div className="flex pt-4 space-x-4 justify-end border-t mt-2">
            <Button
              disabled={isLoadingDeletePatient}
              onClick={async () => await deletePatient(patientID)}
              size={'sm'}
              className="bg-red-50 text-red-500 hover:bg-red-100"
            >
              {isLoadingDeletePatient && (
                <Loader2 className="animate-spin mr-2" size={15} />
              )}
              Delete
            </Button>
            <Button
              disabled={isLoading}
              onClick={async () => await updatePatient(inputValues)}
              size={'sm'}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={15} />}
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfileSettings
