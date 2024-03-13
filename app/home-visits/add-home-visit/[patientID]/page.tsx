/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import {
  Box,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react'
import { useAddPatientMutation } from '@/api/patient/patients.api'
import TaskOne from '../../../_components/home-visit/TaskOne'
import TaskTwo from '../../../_components/home-visit/TaskTwo'
import TaskThree from '../../../_components/home-visit/TaskThree'
import TaskFour from '../../../_components/home-visit/TaskFour'

const steps = [
  { title: 'Task One', description: 'Task One Form' },
  { title: 'Task Two', description: 'Task Two Form' },
  { title: 'Task Three', description: 'Task Three Form' },
  { title: 'Task Four', description: 'Task Four Form' }
]

const DisclosureChecklist = () => {
  const [activeStep, setActiveStep] = useState(1)

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

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = async () => {
    if (activeStep === 3) {
      await addPatient(inputValues)
    } else {
      setActiveStep((prevStep) => prevStep + 1)
    }
    // navigate({
    //   pathname: '/add-invoice',
    //   search: `?id=${invoiceId}`,
    // });
    // setSearchParams(activeStep);
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const [addPatient, { isLoading }] = useAddPatientMutation()

  return (
    <div className="ml-64 pt-16 flex flex-col justify-center items-center">
      <div
        style={{
          width: '45%'
        }}
        className="border border-slate-200 p-2 bg-slate-50 rounded-xl"
      >
        <Stepper index={activeStep} colorScheme="teal">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      <div
      style={{
        width: '45%'
      }}
      >
        {activeStep === 1 && (
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
        )}
        {activeStep === 2 && (
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
        )}

        {activeStep === 3 && (
          <TaskThree
            isReassuredCaregiver={isReassuredCaregiver}
            setIsReassuredCaregiver={setIsReassuredCaregiver}
            isAssessedChildCaregiverComfort={isAssessedChildCaregiverComfort}
            setIsAssessedChildCaregiverComfort={
              setIsAssessedChildCaregiverComfort
            }
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
            setIsReviewedBenefitsOfDisclosure={
              setIsReviewedBenefitsOfDisclosure
            }
            isExplainedCareOptions={isExplainedCareOptions}
            setIsExplainedCareOptions={setIsExplainedCareOptions}
            isConcludedSessionReassured={isConcludedSessionReassured}
            setIsConcludedSessionReassured={setIsConcludedSessionReassured}
            taskThreeComments={taskThreeComments}
            setTaskThreeComments={setTaskThreeComments}
          />
        )}

        {activeStep === 4 && (
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
        )}

        <div className="flex justify-end pt-2 gap-x-2">
          <Button
            size={'sm'}
            onClick={handleBack}
            isDisabled={activeStep === 1}
          >
            Back
          </Button>
          <Button
            colorScheme="teal"
            size={'sm'}
            onClick={() => {
              handleNext()
            }}
            isLoading={isLoading}
          >
            {activeStep === 3 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DisclosureChecklist
