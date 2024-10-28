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
  handleNext: () => void
  handleBack: () => void
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
    console.log(booleanValues, 'booleanValues')
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
      handleNext()
    }
  }, [handleNext, isSaveData])

  return (
    <div className="flex flex-row justify-between space-x-2 w-full items-start">
      <div className="p-4 flex-1 bg-white">
        <div className="flex flex-1 flex-col border border-slate-200 bg-white rounded-lg ">
          <div className="border-b border-slate-200 p-2 flex flex-row justify-between items-center">
            <p className="capitalize font-bold text-[14px] ">
              Task 1: Assess Child for disclosure eligibility.
            </p>
            <Progress percentage={percentage} />
          </div>
          <CustomCheckbox
            label="Child has met age criteria (between 6 and 10 years)?"
            onChange={setIsCorrectAge}
            value={isCorrectAge}
          />

          <CustomCheckbox
            label="Child and caregiver knowledgeable on the benefits of disclosure?"
            value={isWillingToDisclose}
            onChange={setIsWillingToDisclose}
          />

          <CustomCheckbox
            label="Caregiver willing to disclose to the child?"
            value={isKnowledgeable}
            onChange={setIsKnowledgeable}
          />

          <div className="p-2 w-full">
            <CustomInput
              label="Task 1 comments."
              value={taskOneComments}
              onChange={setTaskOneComments}
            />
          </div>
        </div>
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
              addDisclosureEligibility(inputValues)
            }}
            disabled={isLoadingAddDisclosure}
          >
            {isLoadingAddDisclosure && (
              <Loader2 className="animate-spin mr-2" size={18} />
            )}
            Save
          </Button>

          <Button
            size={'sm'}
            // className="bg-slate-200 text-slate-500 hover:bg-slate-100 "
            variant={'outline'}
            onClick={() => {
              handleNext()
            }}
          >
            Next
            <ChevronsRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
      <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
    </div>
  )
}

export default TaskOne
