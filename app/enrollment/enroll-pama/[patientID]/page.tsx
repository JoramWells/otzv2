/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useState } from 'react'

import StatusAtEnrollmentToPAMA from '@/app/_components/pama/StatusAtEnrollmentToPama'
import PrimaryCareGiver, { type VLDataProps } from '@/app/_components/pama/PrimaryCaregiver'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddPAMAEnrollmentMutation } from '@/api/enrollment/pamaEnrollment.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
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
  const [dateOfEnrollmentToOTZ, setDateOfEnrollmentToOTZ] = useState('')
  const [primaryCaregiverID, setPrimaryCaregiverID] = useState('')
  const [childVLStatus, setChildVLStatus] = useState<VLDataProps | null>(null)
  const [childPrescriptionStatus, setChildPrescriptionStatus] = useState<PrescriptionProps | null>(null)
  const [primaryCaregiverVLStatus, setPrimaryCaregiverVLStatus] = useState<VLDataProps | null>(null)
  const [primaryCaregiverPrescriptionStatus, setPrimaryCaregiverPrescriptionStatus] = useState<PrescriptionProps | null>(null)

  //
  const [addOTZEnrollment, { isLoading }] = useAddPAMAEnrollmentMutation()

  const inputValues = {
    childID: patientID,
    childVLStatus,
    childPrescriptionStatus,
    primaryCaregiverVLStatus,
    primaryCaregiverPrescriptionStatus,
    primaryCaregiverID,
    dateOfEnrollmentToOTZ,
    isPaired: true
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-center mt-2">
        <div className="w-1/2 flex flex-col bg-white border border-slate-200 rounded-lg">
          <div className="bg-slate-100 rounded-t-lg p-2">
            <h1 className="font-bold">
              New Patient Enrollment
              <span className='font-normal text-[14px]'> (PAMA/OTZ)</span>
            </h1>
          </div>
          <StatusAtEnrollmentToPAMA
            patientID={patientID}
            dateOfEnrollmentToOTZ={dateOfEnrollmentToOTZ}
            setDateOfEnrollmentToOTZ={setDateOfEnrollmentToOTZ}
            setChildVLStatus={setChildVLStatus}
            setChildPrescriptionStatus={setChildPrescriptionStatus}
          />
          <PrimaryCareGiver
            setPrimaryCaregiverID={setPrimaryCaregiverID}
            setPrimaryCaregiverPrescriptionStatus={
              setPrimaryCaregiverPrescriptionStatus
            }
            setPrimaryCaregiverVLStatus={setPrimaryCaregiverVLStatus}
          />
          <Button
            onClick={async () => await addOTZEnrollment(inputValues)}
            className="bg-slate-200 hover:bg-slate-100 shadow-none text-black"
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Add
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddPatient
