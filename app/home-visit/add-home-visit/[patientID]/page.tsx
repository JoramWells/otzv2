/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
  useEffect,
  Suspense
} from 'react'
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
import { useGetArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import Avatar from '@/components/Avatar'
import { calculateAge } from '@/utils/calculateAge'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { v4 as uuidv4 } from 'uuid'
import { useSearchParams } from 'next/navigation'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const steps = [
  { title: 'Task One', description: 'Task One Form' },
  { title: 'Task Two', description: 'Task Two Form' },
  { title: 'Task Three', description: 'Task Three Form' },
  { title: 'Task Four', description: 'Task Four Form' }
]

interface SelectProps {
  id: string
  label: string
}

const DisclosureChecklist = ({ params }: any) => {
  const searchParams = useSearchParams()
  const patientID = searchParams.get('patientID')
  // const patientID = params.patientID
  const [activeStep, setActiveStep] = useState(1)

  const [homeVisitReason, setHomeVisitReason] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [frequency, setFrequency] = useState<SelectProps>()

  // 2
  const [isARV, setIsARV]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
  const [isTB, setIsTB]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
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
  const [complaints, setComplaints] = useState('')

  // 4
  const [isCountedPills, setIsCountedPills]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true)
  const [isClinicVisits, setIsClinicVisits]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isDisclosure, setIsDisclosure]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isGuardianSupport, setIsGuardianSupport]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isSupportGroupAttendance, setIsSupportGroupAttendance]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isHouseholdTested, setIsHouseholdTested]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  //
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()
  const { data: statusData } = useGetAllAppointmentStatusQuery()

  //
  const agendaDataOptions = useCallback(() => {
    return (
      agendaData?.filter(
        (item: any) => item.agendaDescription.toLowerCase() === 'home visit'
      ) || []
    )
  }, [agendaData])

  const statusOptions = useCallback(() => {
    return (
      statusData?.filter(
        (item: any) => item.statusDescription.toLowerCase() === 'upcoming'
      ) || []
    )
  }, [statusData])

  const inputValues = {
    homeVisitReasonID: homeVisitReason,
    userID: requestedBy,
    patientID,
    dateRequested,
    appointmentAgendaID:
      agendaDataOptions()?.length > 0 && agendaDataOptions()[0]?.id,
    appointmentStatusID: statusOptions()?.length > 0 && statusOptions()[0]?.id,
    appointmentDate: dateRequested,
    patientVisitID: uuidv4(),

    artPrescription: {
      currentRegimen,
      currentRegimenBegan
    },
    tbPrescription: {
      treatmentStartDate,
      treatmentEndDate,
      intensivePhaseEndDate
    },
    homeVisitFrequencyID: frequency?.id,
    frequency: frequency?.label,
    ol_drugs: oralDrugs,
    noOfPills: noOfMedicine,
    medicineStatus,
    actionTaken,
    returnToClinic,
    isPillsCounted: isCountedPills,
    isClinicVisits,
    isDisclosure,
    isGuardianSupport,
    isSupportGroupAttendance,
    isHouseholdTested
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = async () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const [addHomeVisit, { isLoading }] = useAddHomeVisitMutation()
  const { data: patientData } = useGetArtPrescriptionQuery(patientID)
  const { data: personalData } = useGetPatientQuery(patientID as string)

  useEffect(() => {
    if (patientData) {
      setIsARV(true)
      setCurrentRegimen(patientData?.regimen)
      setCurrentRegimenBegan(
        moment(patientData?.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
      )
    }
    if (noOfMedicine.length === 0) {
      setIsCountedPills(false)
    }
    // setIsCountedPills(false)
  }, [patientData, noOfMedicine])
  console.log(patientData, 'lop')

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex items-center w-full flex-col mt-2 p-2">
        <div className=" p-2 bg-white rounded-xl w-3/4">
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
        <div className="w-full flex justify-center p-2 space-x-2">
          <div className="flex flex-col items-center bg-white rounded-lg p-4 w-1/4 h-[200px]">
            {!personalData
              ? (
              <Skeleton className="w-full h-[200px]" />
                )
              : (
              <Suspense fallback={<div>loading..</div>}>
                <div className="flex flex-col items-center  w-full rounded-lg space-y-1">
                  <Avatar
                    name={`${personalData?.firstName} ${personalData?.middleName}`}
                  />
                  <p className="font-bold">
                    {personalData?.firstName} {personalData?.middleName}
                  </p>
                  <p className="text-[14px] text-slate-500">
                    <span className="font-bold">DOB</span>:{' '}
                    {moment(personalData?.dob).format('ll')},{' '}
                    {calculateAge(personalData?.dob)} yrs
                  </p>
                  <p className="text-[14px] text-slate-500">
                    <span className="font-semibold">Sex:</span>{' '}
                    {personalData?.sex === 'M' ? 'MALE' : 'FEMALE'}
                  </p>

                  <div className="text-slate-500 text-sm">
                    <p>
                      <span className="font-bold">Phone:</span>{' '}
                      <span>{personalData?.phoneNo} </span>
                    </p>
                  </div>
                </div>
              </Suspense>
                )}
          </div>
          <div className="bg-white w-1/2  p-4 rounded-lg">
            {activeStep === 1 && (
              <TaskOne
                homeVisitReason={homeVisitReason}
                setHomeVisitReason={setHomeVisitReason}
                // requestedBy={requestedBy}
                // setRequestedBy={setRequestedBy}
                dateRequested={dateRequested}
                setDateRequested={setDateRequested}
                frequency={frequency as any}
                setFrequency={setFrequency as any}
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
                patientID={patientID as string}
                complaints={complaints}
                setComplaints={setComplaints}
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
                patientID={patientID as string}
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
              {activeStep === 4
                ? (
                <Button
                  colorScheme="teal"
                  size={'sm'}
                  onClick={() => {
                    addHomeVisit(inputValues)
                  }}
                  isLoading={isLoading}
                >
                  Complete
                </Button>
                  )
                : (
                <Button
                  colorScheme="teal"
                  size={'sm'}
                  onClick={() => {
                    handleNext()
                  }}
                  isLoading={isLoading}
                >
                  Next
                </Button>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisclosureChecklist
