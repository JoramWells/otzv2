/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-extraneous-dependencies */

import { useAddExecuteDisclosureMutation } from '@/api/treatmentplan/full/executeDisclosure.api'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import Progress from '@/components/Progress'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const customRound = (value: number) => {
  return Math.floor(value / 5) * 5
}

export interface TaskThreeProps {
  isReassuredCaregiver: boolean
  setIsReassuredCaregiver: (value: boolean) => void
  isAssessedChildCaregiverComfort: boolean
  setIsAssessedChildCaregiverComfort: (value: boolean) => void
  isAssessedChildSafety: boolean
  setIsAssessedChildSafety: (value: boolean) => void
  isSupportedCaregiverChildToDisclose: boolean
  setIsSupportedCaregiverChildToDisclose: (value: boolean) => void
  isObservedImmediateReactions: boolean
  setIsObservedImmediateReactions: (value: boolean) => void
  isInvitedChildQuestions: boolean
  setIsInvitedChildQuestions: (value: boolean) => void
  isReviewedBenefitsOfDisclosure: boolean
  setIsReviewedBenefitsOfDisclosure: (value: boolean) => void
  isExplainedCareOptions: boolean
  setIsExplainedCareOptions: (value: boolean) => void
  isAssessedEnvironmentAndTiming: boolean
  setIsAssessedEnvironmentAndTiming: (value: boolean) => void
  isConcludedSessionReassured: boolean
  setIsConcludedSessionReassured: (value: boolean) => void
  taskThreeComments: string
  setTaskThreeComments: (comment: string) => void
  handleNext: () => void
  handleBack: () => void
  patientID: string
  patientVisitID: string
}
const TaskThree = ({
  isReassuredCaregiver,
  setIsReassuredCaregiver,
  isAssessedChildCaregiverComfort,
  setIsAssessedChildCaregiverComfort,
  isSupportedCaregiverChildToDisclose,
  setIsSupportedCaregiverChildToDisclose,
  isObservedImmediateReactions,
  setIsObservedImmediateReactions,
  isInvitedChildQuestions,
  setIsInvitedChildQuestions,
  isReviewedBenefitsOfDisclosure,
  setIsReviewedBenefitsOfDisclosure,
  isExplainedCareOptions,
  setIsExplainedCareOptions,
  isConcludedSessionReassured,
  setIsConcludedSessionReassured,
  isAssessedEnvironmentAndTiming,
  setIsAssessedEnvironmentAndTiming,
  handleBack,
  handleNext,
  patientID,
  patientVisitID,
  taskThreeComments,
  setTaskThreeComments
}: TaskThreeProps) => {
  const [percentage, setPercentage] = useState(0)

  const [addExecuteDisclosure, { isLoading, data }] = useAddExecuteDisclosureMutation()
  const taskThreeInputValues = {
    isReassuredCaregiver,
    isAssessedChildCaregiverComfort,
    isAssessedEnvironmentAndTiming,
    isSupportedCaregiverChildToDisclose,
    isObservedImmediateReactions,
    isInvitedChildQuestions,
    isReviewedBenefitsOfDisclosure,
    isExplainedCareOptions,
    isConcludedSessionReassured,
    patientID,
    patientVisitID
  }

  //
  useEffect(() => {
    if (data) {
      // router.push(`/users/patients/tab/dashboard/${patientID}`)
      handleNext()
    }
  }, [handleNext, data])

  useEffect(() => {
    const obj = {
      isReassuredCaregiver,
      isAssessedChildCaregiverComfort,
      isAssessedEnvironmentAndTiming,
      isSupportedCaregiverChildToDisclose,
      isObservedImmediateReactions,
      isInvitedChildQuestions,
      isReviewedBenefitsOfDisclosure,
      isExplainedCareOptions,
      isConcludedSessionReassured
    }

    const bValues = Object.values(obj).filter((item) => item).length

    const percentag = (bValues / Object?.keys(obj).length) * 100
    setPercentage(customRound(percentag))
  }, [isAssessedChildCaregiverComfort, isAssessedEnvironmentAndTiming, isConcludedSessionReassured, isExplainedCareOptions, isInvitedChildQuestions, isObservedImmediateReactions, isReassuredCaregiver, isReviewedBenefitsOfDisclosure, isSupportedCaregiverChildToDisclose])

  return (
    <div className="flex flex-row justify-between space-x-2 w-full items-start">
      <div
        className="flex-1 bg-white border border-slate-200 rounded-lg
      ring ring-slate-100
      "
      >
        <div
          className="border-b border-slate-200 p-2 flex items-center justify-between
        bg-slate-50 rounded-t-lg
        "
        >
          <p className="capitalize font-semibold text-[14px] text-slate-800 ">
            Task 3: Execute Disclosure
          </p>
          <Progress percentage={percentage} />
        </div>

        <CustomCheckbox
          label="Reassured the caregiver and child?"
          value={isReassuredCaregiver}
          onChange={setIsReassuredCaregiver}
        />

        <hr />

        {/*  */}
        <CustomCheckbox
          label="Assessed child and caregiver comfort?"
          value={isAssessedChildCaregiverComfort}
          onChange={setIsAssessedChildCaregiverComfort}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Assessed safety(environment and timing)?"
          value={isAssessedEnvironmentAndTiming}
          onChange={setIsAssessedEnvironmentAndTiming}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Supported caregiver to disclose using the simplest language the child can understand?"
          value={isSupportedCaregiverChildToDisclose}
          onChange={setIsSupportedCaregiverChildToDisclose}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Observed the immediate reactions of both the child and
          caregivers and addressed concerns or negative reactions?"
          value={isObservedImmediateReactions}
          onChange={setIsObservedImmediateReactions}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Invited questions from the child?"
          value={isInvitedChildQuestions}
          onChange={setIsInvitedChildQuestions}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Revisited/reviewed the benefits of
          disclosure with the child and caregiver?"
          value={isReviewedBenefitsOfDisclosure}
          onChange={setIsReviewedBenefitsOfDisclosure}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Explained care options available to the child and caregiver?"
          value={isExplainedCareOptions}
          onChange={setIsExplainedCareOptions}
        />
        <hr />

        {/*  */}
        <CustomCheckbox
          label="Concluded the session with reassurance to
          both the child and caregiver? Reiterating importance of confidentiality of
          information of ones health with the child and caregiver"
          value={isConcludedSessionReassured}
          onChange={setIsConcludedSessionReassured}
        />
        <hr />
        <div
        className='p-2'
        >
          <p
            style={{
              color: '#434343'
            }}
            className="ml-4 text-[12px] font-semibold "
          >
            How ofter do you find difficulty remembering to take all your
            medications
          </p>
        </div>
        {/*
    <Select
      style={{
        width: '100%',
        height: '39px'
      }}
      value={isDifficultyRemembering}
      onChange={(val) => setIsDifficultyRemembering(val)}
    >
      <Select.Option>Rarely</Select.Option>
    </Select> */}
        <hr />
        <div className="flex justify-end w-full space-x-2 p-2 items-center mt-2">
          <Button
            className="shadow-none  text-slate-500
               "
            size={'sm'}
            variant={'outline'}
            onClick={() => {
              handleBack()
            }}
          >
            <ChevronsLeft className="mr-1" size={18} />
            Prev
          </Button>

          <Button
            className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
            size={'sm'}
            onClick={() => {
              addExecuteDisclosure(taskThreeInputValues)
            }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </Button>
          <Button
            className="shadow-none  text-slate-500
               "
            size={'sm'}
            variant={'outline'}
            onClick={() => {
              handleNext()
            }}
          >
            Skip
            <ChevronsRight className="ml-1" size={18} />
          </Button>
        </div>
      </div>
      <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
    </div>
  )
}

export default TaskThree
