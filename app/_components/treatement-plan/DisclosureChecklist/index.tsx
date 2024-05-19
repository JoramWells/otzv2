/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'

import { useAddPatientMutation } from '@/api/patient/patients.api'
import TaskOne from './TaskOne'
import TaskTwo from './TaskTwo'
import TaskThree from './TaskThree'
import TaskFour from './TaskFour'
import { Button } from '@/components/ui/button'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  activeStep: number
};

const DisclosureChecklist = ({ activeStep, handleBack, handleNext, patientID }: AddTriageProps) => {
  const [isCorrectAge, setIsCorrectAge]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isWillingToDisclose, setIsWillingToDisclose]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isKnowledgeable, setIsKnowledgeable]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskOneComments, setTaskOneComments] = useState('')
  const [isFreeFromSevereIllness, setIsFreeFromSevereIllness]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isFamilySupport, setIsFamilySupport]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isEnvironmentInterest, setIsEnvironmentInterest]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAware, setIsAware]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isSchoolFree, setIsSchoolFree]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isDisclosureReady, setIsDisclosureReady]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildCommunicated, setIsChildCommunicated]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isSecuredPatientInfo, setIsSecuredPatientInfo]: [ boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskTwoComments, setTaskTwoComments] = useState('')

  // task three
  const [isReassuredCaregiver, setIsReassuredCaregiver]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAssessedChildCaregiverComfort, setIsAssessedChildCaregiverComfort]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAssessedChildSafety, setIsAssessedChildSafety]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isSupportedCaregiverChildToDisclose, setIsSupportedCaregiverChildToDisclose]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isObservedReactions, setIsObserved]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isInvitedChildQuestions, setIsInvitedChildQuestions]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isReviewedBenefitsOfDisclosure, setIsReviewedBenefitsOfDisclosure]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isExplainedCareOptions, setIsExplainedCareOptions]: [ boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isConcludedSessionReassured, setIsConcludedSessionReassured]: [ boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskThreeComments, setTaskThreeComments] = useState('')

  // task four
  const [isPeerRelationshipAssessed, setIsPeerRelationshipAssessed]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildActivityAssessed, setIsChildActivityAssessed]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildQuestionsAllowed, setIsChildQuestionsAllowed]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAddressedNegativeImage, setIsAddressedNegativeImage]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAssessedMoodiness, setIsAssessedMoodiness]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isReferredForPhysic, setIsReferredForPhysic]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isGivenInfo, setIsGivenInfo]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskFourComments, setTaskFourComments] = useState('')
  const [finalComments, setFinalComments] = useState('')

  const inputValues = {
    isCorrectAge,
    isWillingToDisclose,
    isKnowledgeable,
    taskOneComments,
    // taskone

    isFreeFromSevereIllness,
    isFamilySupport,
    isEnvironmentInterest,
    isAware,
    isSchoolFree,
    isDisclosureReady,
    isChildCommunicated,
    isSecuredPatientInfo,
    taskTwoComments,

    // four
    isPeerRelationshipAssessed,
    isChildActivityAssessed,
    isChildQuestionsAllowed,
    isAddressedNegativeImage,
    isAssessedMoodiness,
    isReferredForPhysic,
    isGivenInfo,
    taskFourComments,
    finalComments
  }

  const [addPatient, { isLoading }] = useAddPatientMutation()

  return (
    <div
      style={{
        width: '100%'
      }}
    >
      <TaskOne
        isCorrectAge={isCorrectAge}
        setIsCorrectAge={setIsCorrectAge}
        isWillingToDisclose={isWillingToDisclose}
        setIsWillingToDisclose={setIsWillingToDisclose}
        isKnowledgeable={isKnowledgeable}
        setIsKnowledgeable={setIsKnowledgeable}
        taskOneComments={taskOneComments}
        setTaskOneComments={setTaskOneComments}
      />
      <TaskTwo
        isFreeFromSevereIllness={isFreeFromSevereIllness}
        setIsFreeFromSevereIllness={setIsFreeFromSevereIllness}
        isFamilySupport={isFamilySupport}
        setIsFamilySupport={setIsFamilySupport}
        isEnvironmentInterest={isEnvironmentInterest}
        setIsEnvironmentInterest={setIsEnvironmentInterest}
        isAware={isAware}
        setIsAware={setIsAware}
        isSchoolFree={isSchoolFree}
        setIsSchoolFree={setIsSchoolFree}
        isDisclosureReady={isDisclosureReady}
        setIsDisclosureReady={setIsDisclosureReady}
        isChildCommunicated={isChildCommunicated}
        setIsChildCommunicated={setIsChildCommunicated}
        isSecuredPatientInfo={isSecuredPatientInfo}
        setIsSecuredPatientInfo={setIsSecuredPatientInfo}
        taskTwoComments={taskTwoComments}
        setTaskTwoComments={setTaskTwoComments}
      />

      <TaskThree
        isReassuredCaregiver={isReassuredCaregiver}
        setIsReassuredCaregiver={setIsReassuredCaregiver}
        isAssessedChildCaregiverComfort={isAssessedChildCaregiverComfort}
        setIsAssessedChildCaregiverComfort={setIsAssessedChildCaregiverComfort}
        isAssessedChildSafety={isAssessedChildSafety}
        setIsAssessedChildSafety={setIsAssessedChildSafety}
        isSupportedCaregiverChildToDisclose={
          isSupportedCaregiverChildToDisclose
        }
        setIsSupportedCaregiverChildToDisclose={
          setIsSupportedCaregiverChildToDisclose
        }
        isObservedReactions={isObservedReactions}
        setIsObserved={setIsObserved}
        isInvitedChildQuestions={isInvitedChildQuestions}
        setIsInvitedChildQuestions={setIsInvitedChildQuestions}
        isReviewedBenefitsOfDisclosure={isReviewedBenefitsOfDisclosure}
        setIsReviewedBenefitsOfDisclosure={setIsReviewedBenefitsOfDisclosure}
        isExplainedCareOptions={isExplainedCareOptions}
        setIsExplainedCareOptions={setIsExplainedCareOptions}
        isConcludedSessionReassured={isConcludedSessionReassured}
        setIsConcludedSessionReassured={setIsConcludedSessionReassured}
        taskThreeComments={taskThreeComments}
        setTaskThreeComments={setTaskThreeComments}
      />

      <TaskFour
        isPeerRelationshipAssessed={isPeerRelationshipAssessed}
        setIsPeerRelationshipAssessed={setIsPeerRelationshipAssessed}
        isChildActivityAssessed={isChildActivityAssessed}
        setIsChildActivityAssessed={setIsChildActivityAssessed}
        isChildQuestionsAllowed={isChildQuestionsAllowed}
        setIsChildQuestionsAllowed={setIsChildQuestionsAllowed}
        isAddressedNegativeImage={isAddressedNegativeImage}
        setIsAddressedNegativeImage={setIsAddressedNegativeImage}
        isAssessedMoodiness={isAssessedMoodiness}
        setIsAssessedMoodiness={setIsAssessedMoodiness}
        isReferredForPhysic={isReferredForPhysic}
        setIsReferredForPhysic={setIsReferredForPhysic}
        isGivenInfo={isGivenInfo}
        setIsGivenInfo={setIsGivenInfo}
        taskFourComments={taskFourComments}
        setTaskFourComments={setTaskFourComments}
        finalComments={finalComments}
        setFinalComments={setFinalComments}
      />

      <Button
        onClick={() => {
          handleNext()
        }}
      >
        Next
      </Button>
    </div>
  )
}

export default DisclosureChecklist
