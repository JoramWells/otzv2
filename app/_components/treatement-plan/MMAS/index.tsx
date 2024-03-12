/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'
import {
  Box,
  Button,
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
import { useAddPatientMutation } from '@/api/patient/patients.api'
import MmasFour from './MMASFour'
import MmasEight from './MMASEight'

const steps = [
  { title: 'Personal Details', description: 'Personal Information' },
  { title: 'Contact/Location', description: 'Contact, Location, Occupation' },
  { title: 'ART Status', description: 'Current Regimen' }
]

const itemList = [
  {
    id: 1,
    label: 'Forms'
  },
  {
    id: 2,
    label: 'Morisky Medication Adherence Scale'
  },
  {
    id: 3,
    label: 'Disclosure Checklist'
  },
  {
    id: 4,
    label: 'Follow Up Checklist'
  }
]

const MMASForm = () => {
  const [activeStep, setActiveStep] = useState(1)

  const [isForget, setIsForget] = useState('')
  const [isCareless, setIsCareless] = useState('')
  const [isQuitWorse, setIsQuitWorse] = useState('')
  const [isQuitBetter, setIsQuitBetter] = useState('')
  const [isTookYesterday, setIsTookYesterday] = useState('')
  const [isQuitControl, setIsQuitControl] = useState('')
  const [isUnderPressure, setIsUnderPressure] = useState('')
  const [isDifficultyRemembering, setIsDifficultyRemembering] = useState('')

  const inputValues = {
    isForget,
    isCareless,
    isQuitWorse,
    isQuitBetter,
    isTookYesterday,
    isQuitControl,
    isUnderPressure,
    isDifficultyRemembering
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = async () => {
    if (activeStep === 3) {
      await addPatient(inputValues)
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

  const [addPatient, { isLoading }] = useAddPatientMutation()

  return (
    <div className="pt-14 ml-64 flex flex-row justify-center">
      <div
        style={{
          width: '45%'
        }}
      >
        <div
          style={{
            width: '100%'
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
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </div>
        {activeStep === 1 && (
          <MmasFour
            isForget={isForget}
            setIsForget={setIsForget}
            isCareless={isCareless}
            setIsCareless={setIsCareless}
            isQuitWorse={isQuitWorse}
            setIsQuitWorse={setIsQuitWorse}
            isQuitBetter={isQuitBetter}
            setIsQuitBetter={setIsQuitBetter}
          />
        )}
        {activeStep === 2 && (
          <MmasEight
            isTookYesterday={isTookYesterday}
            setIsTookYesterday={setIsTookYesterday}
            isQuitControl={isQuitControl}
            setIsQuitControl={setIsQuitControl}
            isUnderPressure={isUnderPressure}
            setIsUnderPressure={setIsUnderPressure}
            isDifficultyRemembering={isDifficultyRemembering}
            setIsDifficultyRemembering={setIsDifficultyRemembering}
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
            {activeStep === 3 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MMASForm
