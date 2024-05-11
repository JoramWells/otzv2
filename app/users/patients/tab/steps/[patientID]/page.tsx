'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import VisitDetails from '../_components/steps/VisitDetails'
import History from '../_components/steps/History'

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

const StepsPage = () => {
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
      {activeStep === 1 && <VisitDetails />}
      {activeStep === 2 && <History/>}

      {activeStep === 3 && <div>Examination</div>}

      {activeStep === 4 && <div>Management</div>}
      <div className="flex justify-between">
        <Button onClick={() => { handleBack() }}>Prev</Button>
        <Button onClick={() => { handleNext() }}>Next</Button>
      </div>
    </div>
  )
}

export default StepsPage