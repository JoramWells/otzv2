/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-extraneous-dependencies */

import { useAddPostDisclosureMutation } from '@/api/treatmentplan/full/postDisclosure.api'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import Progress from '@/components/Progress'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const customRound = (value: number) => {
  return Math.floor(value / 5) * 5
}

export interface TaskFourProps {
  isPeerRelationshipAssessed: boolean
  setIsPeerRelationshipAssessed: (val: boolean) => void
  isAssessedChildEngagement: boolean
  setIsAssessedChildEngagement: (val: boolean) => void
  isChildQuestionsAllowed: boolean
  setIsChildQuestionsAllowed: (val: boolean) => void
  isAddressedNegativeSelfImage: boolean
  setIsAddressedNegativeImage: (val: boolean) => void
  isAssessedMoodiness: boolean
  setIsAssessedMoodiness: (val: boolean) => void
  isReferredForPsychiatric: boolean
  setIsReferredForPhysic: (val: boolean) => void
  isGivenAppropriateInfo: boolean
  setIsGivenAppropriateInfo: (val: boolean) => void
  taskFourComments: string
  setTaskFourComments: (val: string) => void
  finalComments: string
  setFinalComments: (val: string) => void
  handleNext: () => void
  handleBack: () => void
  patientID: string
  patientVisitID: string
}
const TaskFour = ({
  isPeerRelationshipAssessed,
  setIsPeerRelationshipAssessed,
  isAssessedChildEngagement,
  setIsAssessedChildEngagement,
  isChildQuestionsAllowed,
  setIsChildQuestionsAllowed,
  isAddressedNegativeSelfImage,
  setIsAddressedNegativeImage,
  isAssessedMoodiness,
  setIsAssessedMoodiness,
  isReferredForPsychiatric,
  setIsReferredForPhysic,
  isGivenAppropriateInfo,
  setIsGivenAppropriateInfo,
  handleBack,
  handleNext,
  patientID,
  patientVisitID,
  taskFourComments,
  setTaskFourComments,
  finalComments,
  setFinalComments
}: TaskFourProps) => {
  const [addPostDisclosure, { isLoading, data }] = useAddPostDisclosureMutation()
  const [percentage, setPercentage] = useState(0)

  const inputValues = {
    isPeerRelationshipAssessed,
    isAssessedChildEngagement,
    isChildQuestionsAllowed,
    isAddressedNegativeSelfImage,
    isAssessedMoodiness,
    isReferredForPsychiatric,
    isGivenAppropriateInfo,
    patientID,
    patientVisitID
  }

  const router = useRouter()

  useEffect(() => {
    const obj = {
      isPeerRelationshipAssessed,
      isAssessedChildEngagement,
      isChildQuestionsAllowed,
      isAddressedNegativeSelfImage,
      isAssessedMoodiness,
      isReferredForPsychiatric,
      isGivenAppropriateInfo,
      patientID,
      patientVisitID
    }

    const bValues = Object.values(obj).filter((item) => item).length

    const percentag = (bValues / Object?.keys(obj).length) * 100
    setPercentage(customRound(percentag))
  }, [isAddressedNegativeSelfImage, isAssessedChildEngagement, isAssessedMoodiness, isChildQuestionsAllowed, isGivenAppropriateInfo, isPeerRelationshipAssessed, isReferredForPsychiatric, patientID, patientVisitID])

  useEffect(() => {
    if (data) {
      router.push(`/users/patients/tab/dashboard/${patientID}`)
    }
  }, [handleNext, data, router, patientID])

  return (
    <div className="flex flex-row justify-between space-x-2 w-full items-start">
      <div className="p-4 flex-1 bg-white">
        <div className="flex flex-col border border-slate-200 rounded-lg ">
          <div className="border-b border-slate-200 p-2 flex items-center justify-between">
            <p className="capitalize font-semibold text-[14px] ">
              Task 4 : Post Disclosure Assessment
            </p>
            <Progress percentage={percentage} />
          </div>
          <CustomCheckbox
            label="Assessed family, social and peer relationship and support after disclose?"
            value={isPeerRelationshipAssessed}
            onChange={setIsPeerRelationshipAssessed}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Assessed the child interest and engagement in children activities like playing?"
            value={isAssessedChildEngagement}
            onChange={setIsAssessedChildEngagement}
          />

          {/*  */}
          <CustomCheckbox
            label="Allowed questions from the child and assessed self-perception and outlook?"
            value={isChildQuestionsAllowed}
            onChange={setIsChildQuestionsAllowed}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Addressed negative body or self-image issues?"
            value={isAddressedNegativeSelfImage}
            onChange={setIsAddressedNegativeImage}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Have you assessed the child for moodiness and negative behaviors?"
            value={isAssessedMoodiness}
            onChange={setIsAssessedMoodiness}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Referred appropriately for psychiatrical and other
          complications developed post disclosure if indicated?"
            value={isReferredForPsychiatric}
            onChange={setIsReferredForPhysic}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Given age appropriate adherence information?"
            value={isGivenAppropriateInfo}
            onChange={setIsGivenAppropriateInfo}
          />
          <hr />

          <p
            style={{
              color: '#434343',
              fontSize: '16px'
            }}
            className="ml-6"
          >
            How ofter do you find difficulty remembering to take all your
            medications
          </p>
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
          <div className="flex justify-end w-full space-x-4 items-center mt-2">
            <Button
              className="shadow-none  text-slate-500
               "
              size={'sm'}
              variant={'outline'}
              onClick={() => {
                handleBack()
              }}
            >
              <ChevronsLeft className="mr-2" size={18} />
              Prev
            </Button>

            <Button
              className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
              size={'sm'}
              onClick={() => {
                addPostDisclosure(inputValues)
              }}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
    </div>
  )
}

export default TaskFour
