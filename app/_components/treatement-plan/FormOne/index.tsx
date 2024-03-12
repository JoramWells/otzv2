/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
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
import TimeAndWork from './TimeAndWork'
import ScheduleAndTime from './ScheduleAndTime'

const steps = [
  { title: 'Time Work', description: 'Schedule and Time' },
  { title: 'Time and Work Info', description: 'Schedule Info' }
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

const FormOne = () => {
  const [activeStep, setActiveStep] = useState(1)

  const [wakeUpTime, setWakeUpTime] = useState('')
  const [departureHomeTime, setDepartureHomeTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalHomeTime, setArrivalHomeTime] = useState('')
  const [morningPlace, setMorningPlace] = useState('')
  const [morningTime, setMorningTime] = useState('')
  const [eveningPlace, setEveningPlace] = useState('')
  const [eveningTime, setEveningTime] = useState('')
  const [medicineStorage, setMedicineStorage] = useState('')
  const [toolAndCues, setToolAndCues] = useState('')
  const [goal, setGoal] = useState('')

  const inputValues = {
    wakeUpTime,
    departureHomeTime,
    arrivalTime,
    arrivalHomeTime,
    departureTime,
    morningPlace,
    morningTime,
    eveningPlace,
    eveningTime,
    medicineStorage,
    toolAndCues,
    goal
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
    <div
      style={{
        width: '100%'
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
        <TimeAndWork
          wakeUpTime={wakeUpTime}
          setWakeUpTime={setWakeUpTime}
          departureHomeTime={departureHomeTime}
          setDepartureHomeTime={setDepartureHomeTime}
          arrivalTime={arrivalTime}
          setArrivalTime={setArrivalTime}
          departureTime={departureTime}
          setDepartureTime={setDepartureTime}
          arrivalHomeTime={arrivalHomeTime}
          setArrivalHomeTime={setArrivalHomeTime}
        />
      )}
      {activeStep === 2 && (
        <ScheduleAndTime
          morningPlace={morningPlace}
          setMorningPlace={setMorningPlace}
          morningTime={morningTime}
          setMorningTime={setMorningTime}
          eveningPlace={eveningPlace}
          setEveningPlace={setEveningPlace}
          eveningTime={eveningTime}
          setEveningTime={setEveningTime}
          medicineStorage={medicineStorage}
          setMedicineStorage={setMedicineStorage}
          toolsAndCues={toolAndCues}
          setToolsAndCues={setToolAndCues}
          goal={goal}
          setGoal={setGoal}
        />
      )}

      <div className="flex justify-end pt-2 gap-x-2">
        <Button size={'sm'} onClick={handleBack} isDisabled={activeStep === 1}>
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
  )
}

export default FormOne
