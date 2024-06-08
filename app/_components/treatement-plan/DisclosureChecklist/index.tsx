/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'

import TaskOne from './TaskOne'
import TaskTwo from './TaskTwo'
import { Button } from '@/components/ui/button'
import { useAddDisclosureChecklistMutation, useGetDisclosureChecklistQuery } from '@/api/treatmentplan/disclosureChecklist.api'
import { Loader2 } from 'lucide-react'
import { useAddDisclosureEligibilityMutation, useGetDisclosureEligibilityQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
};

const DisclosureChecklist = ({ handleBack, handleNext, patientID, appointmentID }: AddTriageProps) => {
  const [isCorrectAge, setIsCorrectAge]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isFreeChildCaregiverFromSevereIllness, setIsFreeChildCaregiverFromSevereIllness]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isConsistentSocialSupport, setIsConsistentSocialSupport]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskOneComments, setTaskOneComments] = useState('')
  const [isInterestInEnvironmentAndPlaying, setIsInterestInEnvironmentAndPlaying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildKnowsMedicineAndIllness, setIsChildKnowsMedicineAndIllness]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isChildSchoolEngagement, setIsChildSchoolEngagement]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isAssessedCaregiverReadinessToDisclose, setIsAssessedCaregiverReadinessToDisclose]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isCaregiverCommunicatedToChild, setIsCaregiverCommunicatedToChild]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isSecuredPatientInfo, setIsSecuredPatientInfo]: [ boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [taskTwoComments, setTaskTwoComments] = useState('')

  // task three
  const [isKnowledgeable, setIsKnowledgeable]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isWillingToDisclose, setIsWillingToDisclose]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const childCaregiverReadinessInput = {
    // taskone

    isFreeChildCaregiverFromSevereIllness,
    isConsistentSocialSupport,
    isInterestInEnvironmentAndPlaying,
    isChildKnowsMedicineAndIllness,
    isChildSchoolEngagement,
    isAssessedCaregiverReadinessToDisclose,
    isCaregiverCommunicatedToChild,
    isSecuredPatientInfo,
    taskTwoComments
  }

  const disclosureEligibilityInputs = {
    // four
    isCorrectAge,
    isKnowledgeable,
    isWillingToDisclose,
    taskOneComments

    //

  }

  const submitData = {
    patientVisitID: appointmentID,
    patientID,
    ...childCaregiverReadinessInput,
    ...disclosureEligibilityInputs
  }

  const [addDisclosureEligibility, { isLoading: isLoadingAddDisclosure, data: isSaveData }] = useAddDisclosureEligibilityMutation()

  const { data: disclosureData } = useGetDisclosureEligibilityQuery(appointmentID)
  console.log(disclosureData, 'dataDisclosure')

  useEffect(() => {
    if (isSaveData) {
      console.log(isSaveData, 'dft')
    }
  }, [isSaveData])

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full border-b border-slate-200 pl-4 pr-4 p-2 bg-slate-200 rounded-t-lg">
        <p className="font-bold text-lg">Partial Disclosure</p>
        <p className="text-[14px] text-slate-500">Last Updated:</p>
      </div>
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
        isFreeFromSevereIllness={isFreeChildCaregiverFromSevereIllness}
        setIsFreeFromSevereIllness={setIsFreeChildCaregiverFromSevereIllness}
        isFamilySupport={isConsistentSocialSupport}
        setIsFamilySupport={setIsConsistentSocialSupport}
        isEnvironmentInterest={isInterestInEnvironmentAndPlaying}
        setIsEnvironmentInterest={setIsInterestInEnvironmentAndPlaying}
        isAware={isChildKnowsMedicineAndIllness}
        setIsAware={setIsChildKnowsMedicineAndIllness}
        isSchoolFree={isChildSchoolEngagement}
        setIsSchoolFree={setIsChildSchoolEngagement}
        isDisclosureReady={isAssessedCaregiverReadinessToDisclose}
        setIsDisclosureReady={setIsAssessedCaregiverReadinessToDisclose}
        isChildCommunicated={isCaregiverCommunicatedToChild}
        setIsChildCommunicated={setIsCaregiverCommunicatedToChild}
        isSecuredPatientInfo={isSecuredPatientInfo}
        setIsSecuredPatientInfo={setIsSecuredPatientInfo}
        taskTwoComments={taskTwoComments}
        setTaskTwoComments={setTaskTwoComments}
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

        {disclosureData || isSaveData
          ? (
          <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={() => {
              handleNext()
            }}
          >
            Next
          </Button>
            )
          : (
          <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={() => {
              addDisclosureEligibility(submitData)
            }}
            disabled={isLoadingAddDisclosure}
          >
            {isLoadingAddDisclosure && (
              <Loader2 className="animate-spin mr-2" size={18} />
            )}
            Save
          </Button>
            )}
      </div>
    </div>
  )
}

export default DisclosureChecklist
