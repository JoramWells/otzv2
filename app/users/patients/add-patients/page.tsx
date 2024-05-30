/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useEffect, useState } from 'react'
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
import PersonalDetail from '@/app/_components/patient/steps/PersonalDetails'
import LocationDetails, { type InputCountyProps } from '@/app/_components/patient/steps/LocationDetails'
import { useAddPatientMutation } from '@/api/patient/patients.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import NextOfKin from '@/app/_components/patient/steps/NextOfKin'
import { useToast } from '@/components/ui/use-toast'
import { redirect } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { type ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const steps = [
  { title: 'Personal Details', description: 'Personal Information' },
  { title: 'Contact/Location', description: 'Contact, Location, Occupation' },
  { title: 'Next of Kin', description: 'Next of Kin Details' }
]
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
    label: 'Patients',
    link: ''
  }
]

interface InputProps {
  firstName: string
  middleName: string
  lastName: string
  sex: string
  dob: string
  phoneNo: string
  idNo: string
  cccNo: string
  occupation: string
  schoolName: string
  // location: string
  // maritalStatus: string
  entryPoint: string
  county: string
  subCounty: string
  ward: string

  //
  kinFirstName: string
  kinLastName: string
  kinGender: string
  kinDOB: string
  kinIDNo: string
  relationship: string
  nextOfKinPhoneNo: string
}

const AddPatient = () => {
  const Schema: ZodType<InputProps> = z.object({
    firstName: z.string().nonempty({ message: 'Required' }),
    middleName: z.string().nonempty({ message: 'Required' }),
    lastName: z.string(),
    sex: z.string(),
    dob: z.string(),
    phoneNo: z.string(),
    idNo: z.string({
      required_error: 'ID No required'
    }).refine(data => data.trim() !== '', {
      message: 'Cannot be empty'
    }),
    cccNo: z.string({
      required_error: 'CCC No is required'
    }).refine(data => data.trim() !== '', {
      message: 'CCC No. is required'
    }),
    occupation: z.string(),
    schoolName: z.string(),
    // location: z.string(),
    // maritalStatus: z.string(),
    entryPoint: z.string(),
    county: z.string(),
    subCounty: z.string(),
    ward: z.string(),

    //
    kinFirstName: z.string({
      required_error: 'Required First name'
    }).refine(data => data.trim() !== '', {
      message: 'First Name is required'
    }),
    kinLastName: z.string({
      required_error: 'Required Second Name'
    }).refine(data => data.trim() !== '', {
      message: 'Last Name is Required'
    }),
    kinGender: z.string(),
    kinDOB: z.string(),
    kinIDNo: z.string(),
    relationship: z.string(),
    nextOfKinPhoneNo: z.string()
  })
  //
  const { toast } = useToast()
  const [activeStep, setActiveStep] = useState(1)

  // const [location, setLocation] = useState<InputCountyProps | null>(null)

  //

  // nofkin
  // const [kinFirstName, setKinFirstName] = useState('')
  // const [kinLastName, setKinLastName] = useState('')
  // const [kinGender, setKinGender] = useState('')
  // const [kinDOB, setKinDOB] = useState('')
  // const [kinIDNo, setKinIDNo] = useState('')

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = () => {
    // if (activeStep === 3) {
    //   await addPatient(inputValues)
    // }

    setActiveStep((prevStep) => prevStep + 1)
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
  const onSubmit = async (formData: any) => {
    const { county, subCounty, ward, ...rest } = formData
    const submissionData = {
      ...rest,
      location: {
        county,
        subCounty,
        ward
      }
    }
    // console.log(submissionData)
    // if(activeStep === 3){
    await addPatient(submissionData)
    // }
  }

  useEffect(() => {
    if (data) {
      console.log(data, 'data')
      redirect('/users/patients')
    }
  }, [data])

  const methods = useForm<InputProps>({
    resolver: zodResolver(Schema)
  })
  const { watch, handleSubmit } = methods
  const county = watch('county')

  const subCounty = watch('subCounty')

  return (
    <>
      <div className="mb-2">
        <BreadcrumbComponent dataList={dataList2} />
      </div>

      <div className="w-full flex flex-col items-center">
        <div
          style={{
            width: '50%'
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
        <FormProvider {...methods}>
          <form
            className="w-1/2 bg-white p-4 rounded-lg mt-4 flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {activeStep === 1 && <PersonalDetail />}
            {activeStep === 2 && (
              <LocationDetails county={county} subCounty={subCounty} />
            )}
            {activeStep === 3 && <NextOfKin />}

            <div className="flex justify-end pt-2 gap-x-4">
              <Button
                size={'sm'}
                onClick={handleBack}
                isDisabled={activeStep === 1}
                type="button"
              >
                Back
              </Button>
              {activeStep === 3 ? (
                <Button
                  colorScheme="teal"
                  size={'sm'}
                  type="submit"
                  // onClick={ () => { handleSubmit(onSubmit) }}
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  size={'sm'}
                  type="button"
                  onClick={handleNext}
                  // isLoading={isLoading}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default AddPatient
