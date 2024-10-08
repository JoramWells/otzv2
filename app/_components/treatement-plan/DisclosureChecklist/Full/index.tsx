/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'

import { Button } from '@/components/ui/button'
import TaskThree from './TaskThree'
import TaskFour from './TaskFour'
import CardHeader from '@/app/users/patients/tab/steps/_components/CardHeader'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
};

const FullDisclosureChecklist = ({ handleBack, handleNext, patientID, appointmentID }: AddTriageProps) => {
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

  // const [addFullDisclosureChecklist, { isLoading: isLoadingAddDisclosure, data: isSaveData }] = useAddFullDisclosureChecklistMutation()

  // const { data: disclosureData } = useGetFullDisclosureChecklistQuery(appointmentID)
  // console.log(disclosureData, 'dataDisclosure')

  return (
    <div className="flex flex-row justify-between space-x-4 w-full items-start">
      <div className=" bg-white border border-slate-200 rounded-lg w-3/4 ">
        <CardHeader header="Full Disclosure" />
        <div className="flex flex-col gap-y-4 p-4">
          <TaskThree
            isReassuredCaregiver={isAssessedChildSafety}
            setIsReassuredCaregiver={setIsAssessedChildSafety}
            isAssessedChildCaregiverComfort={isAssessedChildSafety}
            setIsAssessedChildCaregiverComfort={setIsAssessedChildSafety}
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

          <div className="flex justify-end w-full space-x-4 items-center mt-4">
            <Button
              className="shadow-none bg-slate-200 text-black hover:bg-slate-100"
              onClick={() => {
                handleBack()
              }}
            >
              Prev
            </Button>

          {/* <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={() => {
              addFullDisclosureChecklist(inputValues)
            }}
            disabled={isLoadingAddDisclosure}
          >
            {isLoadingAddDisclosure && (
              <Loader2 className="animate-spin mr-2" size={18} />
            )}
            Complete
          </Button> */}

          </div>
        </div>
      </div>

      <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
    </div>
  )
}

export default FullDisclosureChecklist
