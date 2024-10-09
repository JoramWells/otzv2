/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Suspense, useCallback, useEffect, useState } from 'react'
// import FamilyPanning from '../_components/steps/FamilyPanning'
import MMASForm from '@/app/_components/treatement-plan/MMAS'
import DisclosureChecklist from '@/app/_components/treatement-plan/DisclosureChecklist'
import FormOne from '@/app/_components/treatement-plan/FormOne'
import AddTriage from '../_components/AddTriage'
import { useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { calculateAge } from '@/utils/calculateAge'
import FullDisclosureChecklist from '@/app/_components/treatement-plan/DisclosureChecklist/Full'
import LabTests from '../_components/LabTests'
import CustomStepper from '../_components/CustomStepper'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px]" />
  }
)

const AddArt = dynamic(async () => await import('../_components/AddArt'), {
  ssr: false,
  loading: () => (
    <div
    className='flex w-full justify-between space-x-4'
    >
      <Skeleton className="w-3/4 h-[200px]" />
      <Skeleton className="w-1/3 h-[200px]" />
    </div>
  )
})

//
const PatientProfile = dynamic(
  async () => await import('../_components/PatientProfile'),
  {
    ssr: false,
    loading: () => (
        <Skeleton className="w-1/3 h-[200px]" />
    )
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
    link: '/dashboard'
  }
]

const StepsPage = ({ params }: any) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { patientID } = params
  const [activeStep, setActiveStep] = useState(1)
  const router = useRouter()
  const pathname = usePathname()
  const tab = searchParams.get('step')

  const { data: personalData, isLoading: isLoadingPersonalData } = useGetPatientQuery(patientID)

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

  const [age, setAge] = useState<number>(0)

  useEffect(() => {
    if (tab) {
      setActiveStep(parseInt(tab, 10))
    }
    if (personalData) {
      setAge(calculateAge(personalData?.dob))
    }
  }, [tab, personalData])
  const steps = [
    { title: 'Triage', description: 'Vital Signs' },
    { title: 'ART', description: 'ART Details' },
    { title: 'Lab', description: 'Viral Load, CD4' },
    { title: 'Time', description: 'Time & Schedule' },
    { title: 'MMAS', description: 'MMAS4 & MMAS8' }

  ]

  if (age >= 5 && age <= 8) {
    steps.push({ title: 'Disclosure', description: 'Partial Disclosure' })
  } else if (age >= 9 && age <= 12) {
    steps.push({ title: 'Disclosure', description: 'Full Disclosure' })
  }

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="w-full flex flex-row space-x-4 justify-center relative ">
        {/*  */}
        <div className="flex flex-col items-center w-full p-2">
          <div className="w-full bg-white p-2 rounded-lg static top-[52px] border border-slate-100 ">
            {/*  */}
            <CustomStepper
              steps={steps}
              activeStep={activeStep}
              appointmentID={appointmentID}
            />
          </div>
          <div className="w-full mt-2 flex justify-between items-start space-x-2">
            <PatientProfile
              data={personalData}
              isLoading={isLoadingPersonalData}
            />
              {tab === '1' && activeStep === 1 && (
                <AddTriage
                  vlData={vsData}
                  patientID={patientID}
                  handleBack={handleBack}
                  handleNext={() => {
                    handleNext(activeStep)
                  }}
                  age={age}
                  activeStep={activeStep}
                />
              )}

              {/*  */}
              {tab === '2' && activeStep === 2 && (
                <Suspense fallback={<div>loading...</div>}>
                  <AddArt
                    handleNext={() => {
                      handleNext(activeStep)
                    }}
                    patientID={patientID}
                    handleBack={() => {
                      handleBack()
                    }}
                  />
                </Suspense>
              )}

              {tab === '3' && activeStep === 3 && (
                <LabTests
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

              {tab === '4' && activeStep === 4 && (
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

              {tab === '5' && activeStep === 5 && (
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
                  stepsLength={steps.length}
                />
              )}
              {tab === '6' && activeStep === 6 && age >= 5 && age <= 8 && (
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

              {/*  */}
              {tab === '6' && activeStep === 6 && age >= 9 && age <= 12 && (
                <FullDisclosureChecklist
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
