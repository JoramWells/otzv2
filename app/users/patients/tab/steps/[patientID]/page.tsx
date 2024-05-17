'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
// import History from '../_components/steps/History'
import Examination from '../_components/steps/Examination'
import AllergiesModal from '../_components/AllergiesModal'
import ArtRegimenDialog from '../_components/ArtRegimenDialog'
import ChronicIllnessDialog from '../_components/ChronicIllnessDialog'
import AdverseDrugReactionsDialog from '../_components/AdverseDrugReactionsDialog'
import VitalSigns from '../_components/steps/VitalSigns'
// import FamilyPanning from '../_components/steps/FamilyPanning'
import FamilyPanningModal from '../_components/FamilyPlanningModal'

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
            {activeStep === 1 && <VitalSigns patientID={patientID} />}
            {/* {activeStep === 2 && <FamilyPanning />} */}

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
        {/* all */}
        <div className="w-1/4 flex flex-col space-y-2">
          <ArtRegimenDialog patientID={patientID} />
          <ChronicIllnessDialog />
          <AllergiesModal patientID={patientID} />
          <AdverseDrugReactionsDialog />
          <FamilyPanningModal />
        </div>
      </div>
    </div>
  )
}

export default StepsPage
