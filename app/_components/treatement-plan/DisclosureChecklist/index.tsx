/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'

import TaskOne from './TaskOne'
import TaskTwo from './TaskTwo'
import { Button } from '@/components/ui/button'
import { useAddDisclosureChecklistMutation, useGetDisclosureChecklistQuery } from '@/api/treatmentplan/disclosureChecklist.api'
import { ChevronsLeft, Loader2 } from 'lucide-react'
import { useAddDisclosureEligibilityMutation, useGetDisclosureEligibilityQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import CardHeader from '@/app/users/patients/tab/steps/_components/CardHeader'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  useEffect(() => {
    if (isSaveData) {
      router.push(
        `/users/patients/tab/dashboard/${patientID}`
      )
    }
  }, [isSaveData, patientID, router])

  return (
    <div className="flex flex-row justify-between space-x-4 w-full items-start">
      <div className=" bg-white border border-slate-200 rounded-lg w-3/4 ">
        <CardHeader header="Partial Disclosure" />

        <div className="flex flex-col gap-y-4 p-4">
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
            setIsFreeFromSevereIllness={
              setIsFreeChildCaregiverFromSevereIllness
            }
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

          <div className="flex justify-end w-full space-x-4 items-center mt-2">
            <Button
              className="shadow-none  text-slate-500
               "
               variant={'outline'}
              onClick={() => {
                handleBack()
              }}
            >
              <ChevronsLeft className='mr-2' size={18} />
              Prev
            </Button>

              <Button
                className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
                onClick={() => {
                  addDisclosureEligibility(submitData)
                }}
                disabled={isLoadingAddDisclosure}
              >
                {isLoadingAddDisclosure && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                Complete
              </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 p-4 bg-white">Recent Disclosure</div>
    </div>
  )
}

export default DisclosureChecklist
