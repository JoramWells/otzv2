/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
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
import StatusAtEnrollmentToPAMA from '@/app/_components/pama/StatusAtEnrollmentToPama'
import PrimaryCareGiver from '@/app/_components/pama/PrimaryCaregiver'

const steps = [
  { title: 'Status', description: 'Status at Enrollment' },
  { title: 'Caregiver', description: 'Primary Caregiver(Parent/Guardian)' }
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

const AddPatient = () => {
  const [selected, setSelected] = useState(0)
  const [activeStep, setActiveStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [DOB, setDOB] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [occupation, setOccupation] = useState('')
  const [IDNo, setIDNo] = useState('')
  const [residence, setResidence] = useState('')
  const [subCountyName, setSubCountyName] = useState('')
  const [ARTStartDate, setARTStartDate] = useState('')
  const [originalART, setOriginalART] = useState('')
  const [currentRegimeLine, setCurrentRegimenLine] = useState('')

  const inputValues = {
    firstName,
    middleName,
    lastName,
    patient_gender: gender,
    dob: DOB,
    phoneNo,
    idNo: IDNo,
    cccNo: '',
    residence,
    artStartDate: ARTStartDate,
    originalART,
    currentRegimeLine
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
          <StatusAtEnrollmentToPAMA
          //   firstName={firstName}
          //   middleName={middleName}
          //   lastName={lastName}
          //   dob={DOB}
          //   gender={gender}
          //   idNo={IDNo}
          //   setFirstName={setFirstName}
          //   setMiddleName={setMiddleName}
          //   setLastName={setLastName}
          //   setDOB={setDOB}
          //   setGender={setGender}
          //   setIDNo={setIDNo}
          />
        )}
        {activeStep === 2 && (
          <PrimaryCareGiver
            // phoneNo={phoneNo}
            // occupation={occupation}
            // residence={residence}
            // subCountyName={subCountyName}
            // setPhoneNo={setPhoneNo}
            // setOccupation={setOccupation}
            // setResidence={setResidence}
            // setSubCountyName={setSubCountyName}
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
            {activeStep === 2 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddPatient