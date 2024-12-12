/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import Progress from '@/components/Progress'
import CustomCheckbox from '../../../../components/forms/CustomCheckbox'
import CustomInput from '../../../../components/forms/CustomInput'
import { useEffect, useState } from 'react'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddDisclosureEligibilityMutation } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { useRouter } from 'next/navigation'

const customRound = (value: number) => {
  return Math.floor(value / 5) * 5
}
export interface TaskOneProps {
  patientID: string
  patientVisitID: string
  isCorrectAge: boolean
  setIsCorrectAge: (age: boolean) => void
  isWillingToDisclose: boolean
  setIsWillingToDisclose: (willing: boolean) => void
  isKnowledgeable: boolean
  setIsKnowledgeable: (know: boolean) => void
  taskOneComments: string
  setTaskOneComments: (comments: string) => void
  handleNext?: () => void
  handleBack?: () => void
}

const TaskOne = ({
  isCorrectAge,
  setIsCorrectAge,
  isWillingToDisclose,
  setIsWillingToDisclose,
  isKnowledgeable,
  setIsKnowledgeable,
  taskOneComments,
  setTaskOneComments,
  handleBack,
  handleNext,

  patientID,
  patientVisitID
}: TaskOneProps) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const booleanValues = Object?.entries({
      isCorrectAge,
      isKnowledgeable,
      isWillingToDisclose
    })
      ?.filter(
        ([key]) =>
          key !== 'id' &&
            key !== 'patientID' &&
            key !== 'updatedAt' &&
            key !== 'createdAt' &&
            key !== 'taskOneComments' &&
            key !== 'patientVisitID'
      )
      ?.map(([_, value]) => value)
    const trueCount = booleanValues?.filter((item) => item).length
    // console.log(booleanValues, 'booleanValues')
    const percentag = (trueCount / Object?.keys(booleanValues).length) * 100
    setPercentage(customRound(percentag))
  }, [isCorrectAge, isKnowledgeable, isWillingToDisclose])

  const [
    addDisclosureEligibility,
    { isLoading: isLoadingAddDisclosure, data: isSaveData }
  ] = useAddDisclosureEligibilityMutation()

  const inputValues = {
    isCorrectAge,
    isWillingToDisclose,
    isKnowledgeable,
    taskOneComments,
    patientID,
    patientVisitID
  }

  const router = useRouter()

  useEffect(() => {
    if (isSaveData) {
      // router.push(`/users/patients/tab/dashboard/${patientID}`)
      if (handleNext) {
        handleNext()
      }
    }
  }, [handleNext, isSaveData])

  return (
    <div className="flex flex-row justify-between space-x-2 w-full items-start">
      <div className="flex-1 bg-white border rounded-lg border-slate-200 ring ring-slate-100">
        <div
          className="border-b border-slate-200 p-2 flex flex-row justify-between items-center
          bg-slate-50 rounded-t-lg
          "
        >
          <p className="capitalize font-semibold text-[14px] text-slate-800 ">
            Task 1: Assess Child for disclosure eligibility.
          </p>
          <Progress percentage={percentage} />
        </div>
        <CustomCheckbox
          label="Child has met age criteria (between 6 and 10 years)?"
          onChange={setIsCorrectAge}
          value={isCorrectAge}
        />
        <hr className="text-slate-100" />
        <CustomCheckbox
          label="Child and caregiver knowledgeable on the benefits of disclosure?"
          value={isWillingToDisclose}
          onChange={setIsWillingToDisclose}
        />

        <hr className="text-slate-100" />

        <CustomCheckbox
          label="Caregiver willing to disclose to the child?"
          value={isKnowledgeable}
          onChange={setIsKnowledgeable}
        />

        <hr className="text-slate-100" />

        <div className="p-2 w-full">
          <CustomInput
            label="Task 1 comments."
            value={taskOneComments}
            onChange={setTaskOneComments}
          />
        </div>
        <hr className="text-slate-100" />

        <div className="flex justify-end w-full space-x-2 items-center p-2">
          {handleBack && (
            <Button
              className="shadow-none  text-slate-500
               "
              size={'sm'}
              variant={'outline'}
              onClick={() => {
                handleBack()
              }}
            >
              <ChevronsLeft className="mr-1" size={16} />
              Prev
            </Button>
          )}

          <Button
            className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
            size={'sm'}
            onClick={() => {
              addDisclosureEligibility(inputValues)
            }}
            disabled={isLoadingAddDisclosure || !patientID || !patientVisitID}
          >
            {isLoadingAddDisclosure && (
              <Loader2 className="animate-spin mr-1" size={16} />
            )}
            Save
          </Button>

          {handleNext && (
            <Button
              size={'sm'}
              // className="bg-slate-200 text-slate-500 hover:bg-slate-100 "
              className="shadow-none text-slate-500"
              variant={'outline'}
              onClick={() => {
                handleNext()
              }}
            >
              Next
              <ChevronsRight className="ml-1" size={16} />
            </Button>
          )}
        </div>
      </div>
      {handleNext && (
        <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
      )}
    </div>
  )
}

export default TaskOne
