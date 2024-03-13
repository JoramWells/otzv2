/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import {
  Box,
  Button,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react'
import TaskOne from '../../../_components/home-visit/forms/TaskOne'
import TaskTwo from '../../../_components/home-visit/forms/TaskTwo'
import TaskThree from '../../../_components/home-visit/forms/TaskThree'
import TaskFour from '../../../_components/home-visit/forms/TaskFour'
import { useAddHomeVisitMutation } from '@/api/homevisit/homeVisit.api'

const steps = [
  { title: 'Task One', description: 'Task One Form' },
  { title: 'Task Two', description: 'Task Two Form' },
  { title: 'Task Three', description: 'Task Three Form' },
  { title: 'Task Four', description: 'Task Four Form' }
]

const DisclosureChecklist = ({ params }: any) => {
  const patientID = params.patientID
  const [activeStep, setActiveStep] = useState(1)

  const [homeVisitReason, setHomeVisitReason] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [frequency, setFrequency] = useState('')

  // 2
  const [isARV, setIsARV]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isTB, setIsTB]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [currentRegimenBegan, setCurrentRegimenBegan] = useState('')
  const [treatmentStartDate, setTreatmentStartDate] = useState('')
  const [treatmentEndDate, setTreatmentEndDate] = useState('')
  const [intensivePhaseEndDate, setIntensivePhaseEndDate] = useState('')
  const [currentRegimen, setCurrentRegimen] = useState('')
  const [oralDrugs, setOralDrugs] = useState('')

  // 3
  const [dateHomeVisitRequested, setDateHomeVisitRequested] = useState('')
  const [noOfMedicine, setNoOfMedicine] = useState('')
  const [medicineStatus, setMedicineStatus] = useState('')
  const [actionTaken, setActionTaken] = useState('')
  const [evaluationOfAction, setEvaluationOfAction] = useState('')
  const [returnToClinic, setReturnToClinic] = useState('')

  // 4
  const [isCountedPills, setIsCountedPills]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isClinicVisits, setIsClinicVisits]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isDisclosure, setIsDisclosure]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isGuardianSupport, setIsGuardianSupport]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isSupportGroupAttendance, setIsSupportGroupAttendance]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isHouseholdTested, setIsHouseholdTested]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const inputValues = {
    homeVisitReasonID: homeVisitReason,
    userID: requestedBy,
    patientID,
    dateRequested,
    homeVisitFrequencyID: frequency,
    is_arv: isARV,
    current_regimen_date: currentRegimenBegan,
    artPrescriptionID: currentRegimen,
    ol_drugs: oralDrugs,
    is_TB: isTB,
    treatment_start_date: treatmentStartDate,
    intensive_phase_date: intensivePhaseEndDate,
    end_of_treatment_date: treatmentEndDate,
    date_of_home_visit_requested: dateHomeVisitRequested,
    medicine_counted: noOfMedicine,
    medicine_status: medicineStatus,
    action_taken: actionTaken,
    return_to_clinic: returnToClinic,
    is_pills_counted: isCountedPills,
    is_clinic_visits: isClinicVisits,
    is_disclosure: isDisclosure,
    is_guardian_support: isGuardianSupport,
    is_support_group_attendance: isSupportGroupAttendance,
    is_household_tested: isHouseholdTested
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = async () => {
    if (activeStep === 4) {
      await addHomeVisit(inputValues)
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

  const [addHomeVisit, { isLoading }] = useAddHomeVisitMutation()

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
            homeVisitReason={homeVisitReason}
            setHomeVisitReason={setHomeVisitReason}
            requestedBy={requestedBy}
            setRequestedBy={setRequestedBy}
            dateRequested={dateRequested}
            setDateRequested={setDateRequested}
            frequency={frequency}
            setFrequency={setFrequency}
          />
        )}
        {activeStep === 2 && (
          <TaskTwo
            isARV={isARV}
            setIsARV={setIsARV}
            isTB={isTB}
            setIsTB={setIsTB}
            currentRegimen={currentRegimen}
            setCurrentRegimen={setCurrentRegimen}
            currentRegimenBegan={currentRegimenBegan}
            setCurrentRegimenBegan={setCurrentRegimenBegan}
            treatmentStartDate={treatmentStartDate}
            setTreatmentStartDate={setTreatmentStartDate}
            treatmentEndDate={treatmentEndDate}
            setTreatmentEndDate={setTreatmentEndDate}
            intensivePhaseEndDate={intensivePhaseEndDate}
            setIntensivePhaseEndDate={setIntensivePhaseEndDate}
            oralDrugs={oralDrugs}
            setOralDrugs={setOralDrugs}
          />
        )}

        {activeStep === 3 && (
          <TaskThree
            dateHomeVisitRequested={dateHomeVisitRequested}
            setDateHomeVisitRequested={setDateHomeVisitRequested}
            noOfMedicine={noOfMedicine}
            setNoOfMedicine={setNoOfMedicine}
            medicineStatus={medicineStatus}
            setMedicineStatus={setMedicineStatus}
            actionTaken={actionTaken}
            setActionTaken={setActionTaken}
            evaluationOfAction={evaluationOfAction}
            setEvaluationOfAction={setEvaluationOfAction}
            returnToClinic={returnToClinic}
            setReturnToClinic={setReturnToClinic}
          />
        )}

        {activeStep === 4 && (
          <TaskFour
            isCountedPills={isCountedPills}
            setIsCountedPills={setIsCountedPills}
            isClinicVisits={isClinicVisits}
            setIsClinicVisits={setIsClinicVisits}
            isDisclosure={isDisclosure}
            setIsDisclosure={setIsDisclosure}
            isGuardianSupport={isGuardianSupport}
            setIsGuardianSupport={setIsGuardianSupport}
            isSupportGroupAttendance={isSupportGroupAttendance}
            setIsSupportGroupAttendance={setIsSupportGroupAttendance}
            isHouseholdTested={isHouseholdTested}
            setIsHouseholdTested={setIsHouseholdTested}
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
            {activeStep === 4 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DisclosureChecklist
