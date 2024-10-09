import React from 'react'
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface CustomStepperProps {
  steps: StepType[]
  activeStep: number
  appointmentID: string | null
}

interface StepType {
  title: string
  description: string
}

const CustomStepper = ({ steps, activeStep, appointmentID }: CustomStepperProps) => {
  const router = useRouter()
  return (
    <Stepper index={activeStep} colorScheme="teal"
    size={'sm'}
    >
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
            <StepTitle className=" hover:underline text-[12px] ">{step?.title}</StepTitle>
            <StepDescription className="text-[12px] text-slate-500">
              {step?.description}
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

export default CustomStepper
