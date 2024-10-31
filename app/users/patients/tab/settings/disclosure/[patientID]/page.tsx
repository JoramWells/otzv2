/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import TaskOne from '@/app/_components/treatement-plan/DisclosureChecklist/TaskOne'
import TaskTwo from '@/app/_components/treatement-plan/DisclosureChecklist/TaskTwo'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React, { type Dispatch, type SetStateAction, useState } from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px]" />
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
    label: 'dashboard',
    link: '/dashboard'
  }
]

const PartialPage = ({ params }: any) => {
  const searchParams = useSearchParams()

  const appointmentID = searchParams.get('appointmentID')
  const { patientID } = params
  const [isCorrectAge, setIsCorrectAge]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)

  const [isWillingToDisclose, setIsWillingToDisclose]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)

  const [isKnowledgeable, setIsKnowledgeable]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)

  const [
    isFreeChildCaregiverFromSevereIllness,
    setIsFreeChildCaregiverFromSevereIllness
  ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const [isConsistentSocialSupport, setIsConsistentSocialSupport]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [
    isInterestInEnvironmentAndPlaying,
    setIsInterestInEnvironmentAndPlaying
  ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildKnowsMedicineAndIllness, setIsChildKnowsMedicineAndIllness]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isChildSchoolEngagement, setIsChildSchoolEngagement]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [
    isAssessedCaregiverReadinessToDisclose,
    setIsAssessedCaregiverReadinessToDisclose
  ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isCaregiverCommunicatedToChild, setIsCaregiverCommunicatedToChild]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)

  const [isSecuredPatientInfo, setIsSecuredPatientInfo]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [taskTwoComments, setTaskTwoComments] = useState('')

  const [taskOneComments, setTaskOneComments] = useState('')
  return (
    <div className="w-full">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="w-3/4 flex flex-col space-y-2 mt-2">
        <TaskOne
          isCorrectAge={isCorrectAge}
          setIsCorrectAge={setIsCorrectAge}
          isWillingToDisclose={isWillingToDisclose}
          setIsWillingToDisclose={setIsWillingToDisclose}
          isKnowledgeable={isKnowledgeable}
          setIsKnowledgeable={setIsKnowledgeable}
          taskOneComments={taskOneComments}
          setTaskOneComments={setTaskOneComments}
          patientID={patientID}
          patientVisitID={appointmentID!}
          // handleNext={() => {
          //   handleNext(activeStep)
          // }}
          // handleBack={() => {
          //   handleBack()
          // }}
        />
        <TaskTwo
          isFreeChildCaregiverFromSevereIllness={
            isFreeChildCaregiverFromSevereIllness
          }
          setIsFreeFromSevereIllness={setIsFreeChildCaregiverFromSevereIllness}
          isConsistentSocialSupport={isConsistentSocialSupport}
          setIsConsistentSocialSupport={setIsConsistentSocialSupport}
          isInterestInEnvironmentAndPlaying={isInterestInEnvironmentAndPlaying}
          setIsInterestInEnvironmentAndPlaying={
            setIsInterestInEnvironmentAndPlaying
          }
          isAssessedCaregiverReadinessToDisclose={
            isAssessedCaregiverReadinessToDisclose
          }
          setIsAssessedCaregiverReadinessToDisclose={
            setIsAssessedCaregiverReadinessToDisclose
          }
          isChildKnowsMedicineAndIllness={isChildKnowsMedicineAndIllness}
          setIsChildKnowsMedicineAndIllness={setIsChildKnowsMedicineAndIllness}
          isChildSchoolEngagement={isChildSchoolEngagement}
          setIsChildSchoolEngagement={setIsChildSchoolEngagement}
          isCaregiverCommunicatedToChild={isCaregiverCommunicatedToChild}
          setIsCaregiverCommunicatedToChild={setIsCaregiverCommunicatedToChild}
          isSecuredPatientInfo={isSecuredPatientInfo}
          setIsSecuredPatientInfo={setIsSecuredPatientInfo}
          taskTwoComments={taskTwoComments}
          setTaskTwoComments={setTaskTwoComments}
          patientID={patientID}
          patientVisitID={appointmentID as string}
          // handleNext={() => {
          //   handleNext(activeStep);
          // }}
          // handleBack={() => {
          //   handleBack();
          // }}
        />
      </div>
    </div>
  )
}

export default PartialPage
