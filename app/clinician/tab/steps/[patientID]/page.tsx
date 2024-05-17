'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import VisitDetails from '../_components/steps/VisitDetails'
import History from '../_components/steps/History'
import Examination from '../_components/steps/Examination'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'

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
  { title: 'Visit Details', description: 'Personal Information' },
  { title: 'Contact/Location', description: 'Contact, Location, Occupation' },
  { title: 'ART Status', description: 'Current Regimen' }
]

const StepsPage = ({ params }: any) => {
  const { patientID } = params
  const [activeStep, setActiveStep] = useState(1)

  const [allergy, setAllergy] = useState('')

  const handleNext = () => {
    if (activeStep === 3) {
      // await addPatient(inputValues)
      console.log('last')
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

  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="w-full flex flex-row space-x-4 justify-center  mt-4">
        <div className="flex flex-col items-center w-1/2">
          <div className="w-full bg-white p-2 rounded-lg">
            <Stepper index={activeStep} colorScheme="teal">
              {steps.map((step, idx) => (
                <Step key={idx}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="w-full mt-4 bg-white rounded-lg p-4">
            {activeStep === 1 && <VisitDetails />}
            {activeStep === 2 && <History />}

            {activeStep === 3 && <Examination patientID={patientID} />}

            {activeStep === 4 && <div>Management</div>}
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  handleBack()
                }}
              >
                Prev
              </Button>
              <Button
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-1/4 p-2 flex flex-col space-y-4">
          <div className="border rounded-lg bg-white p-4 w-full">
            <p className="font-bold text-lg">Allergies</p>

            <CaseManagerDialog label="Update">
              <CustomSelect
                label="Select Allergy"
                value={allergy}
                onChange={setAllergy}
                data={[
                  {
                    id: 'caffeine',
                    label: 'Caffeine'
                  }
                ]}
              />

              {/*  */}
              <CustomSelect
                label="Select Reaction"
                value={allergy}
                onChange={setAllergy}
                data={[
                  {
                    id: 'anaemia',
                    label: 'Anaemia'
                  }
                ]}
              />

              {/*  */}
              <CustomSelect
              label='Severity'
                data={[
                  {
                    id: 'mild',
                    label: 'Mild'
                  },
                  {
                    id: 'moderate',
                    label: 'Moderate'
                  },
                  {
                    id: 'severe',
                    label: 'Severe'
                  },
                  {
                    id: 'fatal',
                    label: 'Fatal'
                  }
                ]}
              />

              <CustomInput
              label='Onset'
              type='date'
              />

              <Button
              className='bg-slate-200 text-black shadow-none hover:bg-slate-100'
              >
                Update
              </Button>
            </CaseManagerDialog>
          </div>

          {/*  */}
          <div className="border rounded-lg bg-white p-4">
            <p className="font-bold text-lg">
              Chronic Illness and Cormobidities
            </p>

            <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
              Update
            </Button>
          </div>

          {/*  */}
          <div className="border rounded-lg bg-white p-4">
            <p className="font-bold text-lg">Adverse Drug Reactions </p>

            <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepsPage
