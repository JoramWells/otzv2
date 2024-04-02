/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useMemo } from 'react'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import PatientDetailsContent from '@/app/_components/patient/tab/PatientDetailsContent'

const PatientDetails = ({ params }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const patientID = params.patientID

  const { data: userData } = useGetPatientQuery(patientID)
  console.log(userData, 'usd')

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'Appointments'
      },
      {
        id: 2,
        label: 'Home Visit'
      },
      {
        id: 3,
        label: 'Medical File'
      },
      {
        id: 4,
        label: 'Treatment Plan'
      }
    ],
    []
  )

  return (
    <div className="flex flex-col space-x-4 p-3 mt-14">
      <PatientDetailsContent
        patientID={patientID}
        listData={categoryList}
        userData={userData}
      />

      {/* profile */}
    </div>
  )
}

export default PatientDetails
