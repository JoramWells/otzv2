/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
// import FamilyPanning from '../_components/steps/FamilyPanning'
import MMASForm from '@/app/_components/treatement-plan/MMAS'
import DisclosureChecklist from '@/app/_components/treatement-plan/DisclosureChecklist'
import FormOne from '@/app/_components/treatement-plan/FormOne'
import AddTriage from '../_components/AddTriage'
import { useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UpdateVL from '../_components/UpdateVL'
import AddArt from '../_components/AddArt'
import { useGetMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import Avatar from '@/components/Avatar'
import moment from 'moment'
import { calculateAge } from '@/utils/calculateAge'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
    label: 'dashboard',
    link: 'dashboard'
  }
]

const steps = [
  { title: 'Vitals', description: 'Vital Signs' },
  { title: 'ART', description: 'ART Details' },
  { title: 'Viral Load', description: 'Viral Load' },
  { title: 'Time', description: 'Time & Schedule' },
  { title: 'MMAS', description: 'MMAS-4 & MMAS-8' },
  { title: 'Disclosure', description: 'Checklist' }
]

const StepsPage = ({ params }: any) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { patientID } = params
  const [activeStep, setActiveStep] = useState(1)
  const router = useRouter()
  const pathname = usePathname()
  const tab = searchParams.get('step')

  const { data: personalData } = useGetPatientQuery(patientID)

  const { data: vsData } = useGetVitalSignQuery(appointmentID)
  const { data: mmasData } = useGetMmasFourQuery(appointmentID)

  const updateQueryParams = useCallback((newStep: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', String(newStep))
    router.replace(`${pathname}?${newSearchParams.toString()}`)
  }, [pathname, router, searchParams])

  const pending = true

  useEffect(() => {
    if (tab === null) {
      updateQueryParams(1)
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pending) {
        const info = 'You ave unsaved files'
        e.returnValue = info
        // return info
      }

      // if (!pending) return
      // e.preventDefault()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => { window.removeEventListener('beforeunload', handleBeforeUnload) }
  }, [pending, tab, updateQueryParams])

  const handleNext = (stepx: number) => {
    setActiveStep((prevStep) => {
      const newStep = prevStep + 1
      updateQueryParams(newStep)
      return newStep
    })
  }

  const handleBack = () => {
    setActiveStep((prevStep) => {
      const newStep = prevStep - 1
      updateQueryParams(newStep)
      return newStep
    })
  }

  useEffect(() => {
    if (tab) {
      setActiveStep(parseInt(tab, 10))
    }
  }, [tab])

  console.log(personalData, 'lop')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="w-full flex flex-row space-x-4 justify-center  mt-2">
        <div className="flex flex-col items-center w-full">
          <div className="w-3/4 bg-white p-2 rounded-lg">
            <Stepper index={activeStep} colorScheme="teal">
              {steps.map((step, idx) => (
                <Step
                  key={idx}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push(
                      `?appointmentID=${appointmentID}&step=${String(idx + 1)}`
                    )
                  }}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box>
                    <StepTitle className="text-[14px] hover:underline ">
                      {step.title}
                    </StepTitle>
                    <StepDescription className="text-[12px]">
                      {step.description}
                    </StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="w-full mt-2 flex justify-center items-start space-x-2 p-2">
            <div className="flex flex-col items-center bg-white rounded-lg p-4 w-1/4">
              {personalData && (
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
              )}
            </div>
            <div className="w-1/2 bg-white rounded-lg">
              {tab === '1' && activeStep === 1 && (
                <AddTriage
                  vlData={vsData}
                  patientID={patientID}
                  handleBack={handleBack}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  activeStep={activeStep}
                />
              )}

              {/*  */}
              {tab === '2' && activeStep === 2 && (
                <AddArt
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  patientID={patientID}
                  handleBack={() => {
                    handleBack()
                  }}
                />
              )}

              {tab === '3' && activeStep === 6 && (
                <UpdateVL
                  patientVisitID={appointmentID}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  patientID={patientID}
                  handleBack={() => {
                    handleBack()
                  }}
                />
              )}

              {tab === '4' && activeStep === 3 && (
                <FormOne
                  patientID={patientID}
                  appointmentID={appointmentID}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  handleBack={() => {
                    handleBack()
                  }}
                />
              )}

              {tab === '5' && activeStep === 4 && (
                <MMASForm
                  formData={mmasData}
                  appointmentID={appointmentID}
                  patientID={patientID}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  handleBack={() => {
                    handleBack()
                  }}
                />
              )}
              {tab === '6' && activeStep === 5 && (
                <DisclosureChecklist
                  appointmentID={appointmentID}
                  patientID={patientID}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  handleBack={() => {
                    handleBack()
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {/*  */}
        {/* all */}
        {/* <div className="w-1/4 flex flex-col space-y-2 bg-white rounded-lg p-2">
          <p className="text-lg font-bold">Available Actions</p>
          <AllergiesModal patientID={patientID} />
          <ChronicIllnessDialog />
          <AdverseDrugReactionsDialog />
          <FamilyPanningModal />
          <StagingDialog />
        </div> */}
      </div>
    </>
  )
}

export default StepsPage
