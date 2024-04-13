/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import PatientDetailsContent from '@/app/_components/patient/tab/PatientDetailsContent'

const categoryList = [
  {
    id: 1,
    label: 'Appointments'
  },
  {
    id: 2,
    label: 'Care Giver'
  },
  {
    id: 3,
    label: 'Case Manager'
  },
  {
    id: 4,
    label: 'Home Visit'
  },
  {
    id: 5,
    label: 'Lab'
  },
  {
    id: 6,
    label: 'Pharmacy'
  },
  {
    id: 7,
    label: 'Treatment Plan'
  },
  {
    id: 8,
    label: 'Medical File'
  },
  {
    id: 9,
    label: 'Insights'
  },
  {
    id: 10,
    label: 'Settings'
  }
]

const PatientDetails = ({ params }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const patientID = params.patientID

  const { data: userData, isLoading, isError } = useGetPatientQuery(patientID)

  return (
    <div className="flex flex-row space-x-4 p-4 mt-14 items-start">

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
