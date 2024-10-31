/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-extraneous-dependencies */

import CustomInput from '@/components/forms/CustomInput'
import CustomCheckbox from '../../../../components/forms/CustomCheckbox'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, Loader2 } from 'lucide-react'
import { useAddChildCaregiverReadinessMutation } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { useEffect, useState } from 'react'
import Progress from '@/components/Progress'
import { useRouter } from 'next/navigation'

const customRound = (value: number) => {
  return Math.floor(value / 5) * 5
}
export interface TaskTwoProps {
  patientID: string
  patientVisitID: string
  isChildSchoolEngagement: boolean
  isFreeChildCaregiverFromSevereIllness: boolean
  setIsFreeFromSevereIllness: (val: boolean) => void
  isConsistentSocialSupport: boolean
  isAssessedCaregiverReadinessToDisclose: boolean
  setIsConsistentSocialSupport: (val: boolean) => void
  isInterestInEnvironmentAndPlaying: boolean
  setIsInterestInEnvironmentAndPlaying: (val: boolean) => void
  isChildKnowsMedicineAndIllness: boolean
  setIsChildKnowsMedicineAndIllness: (val: boolean) => void
  setIsChildSchoolEngagement: (val: boolean) => void
  setIsAssessedCaregiverReadinessToDisclose: (val: boolean) => void
  isCaregiverCommunicatedToChild: boolean
  setIsCaregiverCommunicatedToChild: (val: boolean) => void
  isSecuredPatientInfo: boolean
  setIsSecuredPatientInfo: (val: boolean) => void
  taskTwoComments: string
  setTaskTwoComments: (val: string) => void
  handleNext?: () => void
  handleBack?: () => void
}
const TaskTwo = ({
  isFreeChildCaregiverFromSevereIllness,
  setIsFreeFromSevereIllness,
  isConsistentSocialSupport,
  setIsConsistentSocialSupport,
  isInterestInEnvironmentAndPlaying,
  setIsInterestInEnvironmentAndPlaying,

  setIsChildSchoolEngagement,
  setIsAssessedCaregiverReadinessToDisclose,
  isCaregiverCommunicatedToChild,
  setIsCaregiverCommunicatedToChild,
  isSecuredPatientInfo,
  setIsSecuredPatientInfo,
  taskTwoComments,
  setTaskTwoComments,
  handleBack,
  handleNext,
  isAssessedCaregiverReadinessToDisclose,
  isChildKnowsMedicineAndIllness,
  setIsChildKnowsMedicineAndIllness,
  patientID,
  isChildSchoolEngagement,
  patientVisitID
}: TaskTwoProps) => {
  const [percentage, setPercentage] = useState(0)

  const inputValues = {
    isFreeChildCaregiverFromSevereIllness,
    isConsistentSocialSupport,
    isInterestInEnvironmentAndPlaying,
    isChildKnowsMedicineAndIllness,
    isCaregiverCommunicatedToChild,
    isSecuredPatientInfo,
    taskTwoComments,
    isAssessedCaregiverReadinessToDisclose,
    patientID,
    isChildSchoolEngagement,
    patientVisitID,
    setIsCaregiverCommunicatedToChild
  }
  const [addChildCaregiverReadiness, { isLoading, data: readinessData }] =
    useAddChildCaregiverReadinessMutation()

  const router = useRouter()

  useEffect(() => {
    if (readinessData) {
      router.push(`/users/patients/tab/dashboard/${patientID}`)
      // handleNext();
    }
  }, [handleNext, patientID, readinessData, router])

  useEffect(() => {
    const obj = {
      isFreeChildCaregiverFromSevereIllness,
      isConsistentSocialSupport,
      isInterestInEnvironmentAndPlaying,
      isChildKnowsMedicineAndIllness,
      isCaregiverCommunicatedToChild,
      isSecuredPatientInfo,
      isAssessedCaregiverReadinessToDisclose,
      isChildSchoolEngagement
    }

    const bValues = Object.values(obj).filter(item => item).length

    const percentag = (bValues / Object?.keys(obj).length) * 100
    setPercentage(customRound(percentag))
  }, [isAssessedCaregiverReadinessToDisclose, isCaregiverCommunicatedToChild, isChildKnowsMedicineAndIllness, isChildSchoolEngagement, isConsistentSocialSupport, isFreeChildCaregiverFromSevereIllness, isInterestInEnvironmentAndPlaying, isSecuredPatientInfo])

  return (
    <div className="flex flex-row justify-between space-x-2 w-full items-start">
      <div className="p-4 flex-1 bg-white">
        <div className="flex flex-1 flex-col border border-slate-200 bg-white rounded-lg ">
          <div className="border-b border-slate-200 p-2 flex flex-row justify-between items-center">
            <p className="capitalize font-bold text-[14px]">
              Task 2: Assess child and caregiver for readiness.
            </p>
            <Progress percentage={percentage} />
          </div>
          <CustomCheckbox
            label="Child/ caregiver free from severe
          physical illness, trauma, psychological illness or psychiatric illness?"
            value={isFreeChildCaregiverFromSevereIllness}
            onChange={setIsFreeFromSevereIllness}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Child has consistent family, peer or social support?"
            value={isConsistentSocialSupport}
            onChange={setIsConsistentSocialSupport}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Child demonstrates interest in the environment and playing activities?"
            value={isInterestInEnvironmentAndPlaying}
            onChange={setIsInterestInEnvironmentAndPlaying}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Assessed what the child already
          knows about the medicines and illness and addressed needs and concerns?"
            value={isChildKnowsMedicineAndIllness}
            onChange={setIsChildKnowsMedicineAndIllness}
          />

          {/*  */}
          <hr />

          {/*  */}
          <CustomCheckbox
            label=" Assessed functional school engagement by the child consistent, attendance, interacts well with the school community, able to freely discuss school activities?"
            value={isChildSchoolEngagement}
            onChange={setIsChildSchoolEngagement}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Assessed caregiver readiness for disclosure to the child?"
            value={isAssessedCaregiverReadinessToDisclose}
            onChange={setIsAssessedCaregiverReadinessToDisclose}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Assessed what the caregiver has communicated to the child?"
            value={isCaregiverCommunicatedToChild}
            onChange={setIsCaregiverCommunicatedToChild}
          />
          <hr />

          {/*  */}
          <CustomCheckbox
            label="Discussed management of confidentiality of information regarding one
          health with the child and caregiver?"
            value={isSecuredPatientInfo}
            onChange={setIsSecuredPatientInfo}
          />
          <hr />

          <div className="p-2 w-full">
            <CustomInput
              label="Task 2 comments."
              value={taskTwoComments}
              onChange={setTaskTwoComments}
            />
          </div>
        </div>
        <div className="flex justify-end w-full space-x-4 items-center mt-2">
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
              <ChevronsLeft className="mr-2" size={18} />
              Prev
            </Button>
          )}

          <Button
            className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
            size={'sm'}
            onClick={() => {
              addChildCaregiverReadiness(inputValues)
            }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </Button>
        </div>
      </div>
      {handleBack && (
        <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
      )}
    </div>
  )
}

export default TaskTwo
