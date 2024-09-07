/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
  useEffect,
  useMemo
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
import TaskTwo from '../../../_components/home-visit/forms/TaskTwo'
import TaskThree from '../../../_components/home-visit/forms/TaskThree'
import TaskFour from '../../../_components/home-visit/forms/TaskFour'
import { useAddHomeVisitMutation } from '@/api/homevisit/homeVisit.api'
import { useGetArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { v4 as uuidv4 } from 'uuid'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import PatientProfileHomeVisit from '../../_components/PatientProfileHomeVisit'
import { useGetHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import CurrentConfig from '../../_components/CurrentConfig'

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
  // { title: 'Task One', description: 'Task One Form' },
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
  const { homeVisitID } = params

  // const patientID = searchParams.get('patientID')
  const { data: session } = useSession()

  //
  const userID = session?.user.id
  //
  const [activeStep, setActiveStep] = useState(1)

  const [homeVisitReason, setHomeVisitReason] = useState('')

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

  const [addHomeVisit, { isLoading }] = useAddHomeVisitMutation()
  const [addPatientVisit, { isLoading: isLoadingVisit, data: visitData }] =
      useAddPatientVisitMutation()

  const inputValues = useMemo(
    () => [
      {
        homeVisitConfigID: homeVisitID,
        userID,
        patientID,
        frequency: 'weekly',
        appointmentAgendaID:
          agendaDataOptions()?.length > 0 && agendaDataOptions()[0]?.id,
        appointmentStatusID:
          statusOptions()?.length > 0 && statusOptions()[0]?.id,
        appointmentDate: returnToClinic,
        patientVisitID: visitData?.id,

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
        // frequency: frequency?.label,
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
    ],
    [
      actionTaken,
      agendaDataOptions,
      currentRegimen,
      currentRegimenBegan,
      frequency?.id,
      homeVisitReason,
      intensivePhaseEndDate,
      isClinicVisits,
      isCountedPills,
      isDisclosure,
      isGuardianSupport,
      isHouseholdTested,
      isSupportGroupAttendance,
      medicineStatus,
      noOfMedicine,
      oralDrugs,
      patientID,
      returnToClinic,
      statusOptions,
      treatmentEndDate,
      treatmentStartDate,
      userID,
      visitData?.id
    ]
  )

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

  const { data: patientData } = useGetArtPrescriptionQuery(patientID)
  const { data: personalData, isLoading: isLoadingPersonalInfo } = useGetPatientQuery(patientID as string)
  const { data: homeVisitConfigData } = useGetHomeVisitConfigQuery(homeVisitID as string)

  const handleStartVisit = useCallback(async () => {
    const newVisitID = uuidv4()
    const inputValue = {
      patientID,
      id: newVisitID
    }
    await addPatientVisit(inputValue)

    //
    // if (visitData?.id) {
    //   // setPatientVisitID(visitData.id)
    //   await addHomeVisitConfig(inputValues[0])
    // }
  }, [addPatientVisit, patientID])

  //
  useEffect(() => {
    if (visitData?.id) {
      // setPatientVisitID(visitData?.id)
      void addHomeVisit(inputValues[0])
    }
  }, [visitData, addHomeVisit, inputValues])
  const [name1, setName1] = useState<string | undefined>()
  const [name2, setName2] = useState<string | undefined>()
  const [DOB, setDOB] = useState<Date | string | undefined>()
  const [NO, setNO] = useState<string | undefined>()
  const [gender, setGender] = useState<string | undefined>()

  useEffect(() => {
    if (patientData && personalData) {
      const { firstName, middleName, dob, phoneNo, sex } = personalData
      setName1(firstName)
      setName2(middleName)
      setDOB(dob)
      setNO(phoneNo)
      setGender(sex)

      //
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
  }, [patientData, noOfMedicine, personalData])
  console.log(patientData, 'lop')

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        {/* profile */}
        <PatientProfileHomeVisit
          isLoading={isLoadingPersonalInfo}
          firstName={name1}
          middleName={name2}
          dob={DOB}
          phoneNo={NO}
          sex={gender}
        />

        <div
        className='flex flex-row space-x-2 p-2 items-start w-full'
        >
          <CurrentConfig
            dateRequested={homeVisitConfigData?.dateRequested}
            frequency={homeVisitConfigData?.frequency}
            homeVisitReasonDescription={
              homeVisitConfigData?.HomeVisitReason.homeVisitReasonDescription
            }
            id={homeVisitConfigData?.id}
            patientID={patientID!}
          />

          <div className="flex items-center w-1/2 flex-col space-y-2">
            <div className=" p-2 bg-white rounded-xl w-full">
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
            {/* profile */}
            <div className="bg-white w-full  p-4 rounded-lg">
              {activeStep === 1 && (
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

              {activeStep === 2 && (
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

              {activeStep === 3 && (
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
                      handleStartVisit()
                    }}
                    isLoading={isLoading || isLoadingVisit}
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

<div
className='w-1/4 bg-white rounded-lg p-4'
>
  <h3>Recent Home Visit</h3>
</div>

        </div>
      </div>
    </div>
  )
}

export default DisclosureChecklist
