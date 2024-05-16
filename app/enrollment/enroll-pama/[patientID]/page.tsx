/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useState } from 'react'

import StatusAtEnrollmentToPAMA from '@/app/_components/pama/StatusAtEnrollmentToPama'
import PrimaryCareGiver from '@/app/_components/pama/PrimaryCaregiver'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[38px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'enrollments',
    link: 'enrollments'
  }
]

const AddPatient = ({ params }: any) => {
  const { patientID } = params
  const [artStatusID, setARTStatusID] = useState('')
  const [vlStatusID, setVLStatusID] = useState('')
  const [dateOfEnrollmentToOTZ, setDateOfEnrollmentToOTZ] = useState('')
  const [caregiverARTStatusID, setCaregiverARTStatusID] = useState('')
  const [caregiverVLStatusID, setCaregiverVLStatusID] = useState('')

  const inputValues = {
    artStatusID,
    vlStatusID,
    dateOfEnrollmentToOTZ,
    caregiverARTStatusID,
    caregiverVLStatusID
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  return (
    <div className="p-2">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-center mt-2">
        <div
          style={{
            width: '50%'
          }}
        >
          <StatusAtEnrollmentToPAMA
            patientID={patientID}
            dateOfEnrollmentToOTZ={dateOfEnrollmentToOTZ}
            setDateOfEnrollmentToOTZ={setDateOfEnrollmentToOTZ}
            setARTStatusID={setARTStatusID}
            setVLStatusID={setVLStatusID}
          />
          <PrimaryCareGiver
          setCaregiverARTStatusID={setCaregiverARTStatusID}
          setCaregiverVLStatusID={setCaregiverVLStatusID}

          />
        </div>
      </div>
    </div>
  )
}

export default AddPatient
