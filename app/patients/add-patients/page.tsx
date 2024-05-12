/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useEffect, useState } from 'react'
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
  Stepper,
  useSteps
} from '@chakra-ui/react'
import PersonalDetail from '@/app/_components/patient/steps/PersonalDetails'
import LocationDetails from '@/app/_components/patient/steps/LocationDetails'
import { useAddPatientMutation } from '@/api/patient/patients.api'
import { redirect } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import NextOfKin from '@/app/_components/patient/steps/NextOfKin'

const steps = [
  { title: 'Personal Details', description: 'Personal Information' },
  { title: 'Contact/Location', description: 'Contact, Location, Occupation' },
  { title: 'Next of Kin', description: 'Next of Kin Details' }
]
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[36px] rounded-lg" />
  }
)

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

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
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
  const [nextOfKinPhoneNo, setNextOfKinPhoneNo] = useState('')
  const [currentRegimeLine, setCurrentRegimenLine] = useState('')
  const [mflCode, setMFLCode] = useState('')
  const [cccNo, setCCCNo] = useState('')
  const [clinic, setClinic] = useState('')
  const [relationship, setRelationship] = useState('')

  const inputValues = {
    firstName,
    middleName,
    lastName,
    sex: gender,
    dob: DOB,
    phoneNo,
    idNo: IDNo,
    residence,
    artStartDate: ARTStartDate,
    entryPoint: clinic,
    currentRegimeLine,
    cccNo,
    mflCode
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

  const [addPatient, { isLoading, data }] = useAddPatientMutation()

  useEffect(() => {
    if (data) {
      redirect(
        `/patients/${data.id}?tab=appointments`
      )
    }
  }, [data])
  console.log(data)

  return (
    <div className="p-2">
      <div className="mb-2">
        <BreadcrumbComponent dataList={dataList2} />
      </div>
      <div
        className="block m-auto"
        style={{
          width: '55%'
        }}
      >
        <div
          style={{
            width: '100%'
          }}
          className=" p-2 bg-white rounded-xl"
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
                  <StepDescription className="text-[12px] ">
                    {step.description}
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </div>
        {activeStep === 1 && (
          <PersonalDetail
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            dob={DOB}
            gender={gender}
            idNo={IDNo}
            setFirstName={setFirstName}
            setMiddleName={setMiddleName}
            setLastName={setLastName}
            setDOB={setDOB}
            setGender={setGender}
            setIDNo={setIDNo}
            cccNo={cccNo}
            mflCode={mflCode}
            setCCCNo={setCCCNo}
            setMFLCode={setMFLCode}
          />
        )}
        {activeStep === 2 && (
          <LocationDetails
            phoneNo={phoneNo}
            occupation={occupation}
            residence={residence}
            subCountyName={subCountyName}
            setPhoneNo={setPhoneNo}
            setOccupation={setOccupation}
            setResidence={setResidence}
            setSubCountyName={setSubCountyName}
          />
        )}
        {activeStep === 3 && (
          <NextOfKin
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            dob={DOB}
            gender={gender}
            idNo={IDNo}
            setFirstName={setFirstName}
            setMiddleName={setMiddleName}
            setLastName={setLastName}
            setDOB={setDOB}
            setGender={setGender}
            setIDNo={setIDNo}
            relationship={relationship}
            nextOfKinPhoneNo={nextOfKinPhoneNo}
            setRelationship={setRelationship}
            setNextOfKinPhoneNo={setNextOfKinPhoneNo}
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

export default AddPatient
