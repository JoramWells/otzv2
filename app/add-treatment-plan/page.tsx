/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'
import SideMenuBar from '../_components/treatement-plan/SideMenuBar'
import {
  Box, Button, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps
} from '@chakra-ui/react'

const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' }
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

const AddTreatmentPlan = () => {
  const [selected, setSelected] = useState(0)
  const handleStepChange = useCallback((step: number) => {
    setSelected(step)
  }, [])

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length
  })

  return (
    <div className="p-3 flex flex-row space-x-6 justify-between">
      <div
        className="p-2 space-y-1 border border-gray-200 w-72
      rounded-md flex flex-col items-center justify-center
      "
      >
        {itemList.map((item, idx) => (
          <SideMenuBar
            key={item.id}
            text={item.label}
            onClick={() => {
              handleStepChange(idx + 1)
            }}
            selected={item.id === 1}
          />
        ))}
      </div>
      <div className="flex-1">
        <Stepper index={activeStep}>
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
    </div>
  )
}

export default AddTreatmentPlan
