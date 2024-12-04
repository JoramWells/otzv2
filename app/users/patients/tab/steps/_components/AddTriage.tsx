/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation, useGetVitalSignByPatientIDQuery } from '@/api/lab/vitalSigns.api'
// import CustomInput from '@/components/forms/CustomInput'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AdultSchema, InfantSchema } from './type'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import CardHeader from './CardHeader'
import RecentVitalSigns from './LabTests/RecentVitalSigns'
import { useToast } from '@/components/ui/use-toast'

export interface VSProps {
  temperature: number
  pulseRate: number
  diastolic: number
  systolic: number
  respiratoryRate: number
  oxygenSAturation: number
  height: string
  weight: string
  // MUAC: string
  // LMP: string
}

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  activeStep: number
  vlData: VSProps
  age: number
};

interface InputProps {
  temperature: number
  pulseRate: number
  diastolic: number
  systolic: number
  respiratoryRate: number
  oxygenSAturation: number
  height: number
  weight: number
  MUAC: string
  LMP: string
}

const AddTriage = ({
  patientID,
  handleNext,
  handleBack,
  activeStep,
  vlData,
  age
}: AddTriageProps) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')

  //

  // useEffect(() => {
  //   if (vlData) {
  //     setTemperature(vlData.temperature)
  //     setPulseRate(vlData.pulseRate)
  //     setDiastolic(vlData.diastolic)
  //     setSystolic(vlData.systolic)
  //     setRespiratoryRate(vlData.respiratoryRate)
  //     setOxygen(vlData.oxygenSAturation)
  //     setheight(vlData.height)
  //     setWeight(vlData.weight)
  //     setMUAC(vlData.MUAC)
  //     setLMP(vlData.LMP)
  //   }
  // }, [vlData])

  //
  const [addVitalSign, { isLoading, data: vsData }] = useAddVitalSignMutation()
  const { data: latestVitalsData } = useGetVitalSignByPatientIDQuery(patientID)

  const { toast } = useToast()

  // Toast method
  const send = useCallback(
    () =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: 'New Vitals Created Successfully!!'
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  useEffect(() => {
    if (vsData) {
      handleNext()
      send()
    }
  }, [vsData, handleNext, send])

  const methods = useForm<InputProps>({
    resolver: zodResolver(age <= 1 ? InfantSchema : AdultSchema)
  })

  //
  const onSubmit = async (data: any) => {
    const submitData = {
      patientID,
      patientVisitID: appointmentID,
      type: 'clinical encounter',
      ...data
    }
    await addVitalSign(submitData)
  }

  const { handleSubmit } = methods

  return (
    <div className="flex items-start justify-between space-x-4 w-full ">
      <Suspense fallback={<Skeleton className="w-3/4 h-[400px] " />}>
        <div className="w-3/4 bg-white rounded-lg border border-slate-200 ">
          <CardHeader
            header="Triage"
            rightContent={
              <>
                {age < 9 ? (
                  <Badge
                    className="shadow-none
            bg-purple-50 border border-purple-200 text-purple-500 uppercase
            "
                  >
                    Paed
                  </Badge>
                ) : (
                  <Badge className="shadow-none">Adult</Badge>
                )}
              </>
            }
          />

          <div className="p-4 relative pb-[68px]">
            <FormProvider {...methods}>
              <form
                className="p-4 rounded-lg flex flex-col space-y-4 border"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CustomInput2
                  label="Temperature (°C)"
                  name="temperature"
                  type="number"
                  placeholder='Enter temperature value'
                  description='The current body temperature as recorded now.'
                  // onChange={setTemperature}
                />

                <div className="w-full flex justify-between items-center space-x-8">
                  <CustomInput2
                    label="Pulse Rate (bpm)"
                    name="pulseRate"
                    placeholder='Enter pulse rate value'
                    description='Describes the number of times the heart beats measured in beats per minute.'
                    // onChange={setPulseRate}
                  />
                  <CustomInput2
                    label="Respiratory Rate"
                    name="respiratoryRate"
                    placeholder='Enter respiratory rate value'
                    description='The number of breaths taken in a minute. Measured in breaths per minute.'
                    // onChange={setRespiratoryRate}
                  />
                </div>

                <div className='mt-2'>
                  <p className="font-bold">Blood Pressure (mmHg)</p>
                  <div className="flex flex-row w-full p-4 rounded-lg border border-slate-200 space-x-4 items-center">
                    <CustomInput2
                      label="Systolic"
                      name="systolic"
                      placeholder='Enter systolic value'
                      description='Represents the pressure in the arteries when heart beats (mmHg).'
                      // onChange={setSystolic}
                    />
                    <CustomInput2
                      label="Diastolic"
                      name="diastolic"
                      placeholder='Enter diastolic value'
                      description='Represents the pressure in when the heart is at rest (mmHg).'
                      // onChange={setDiastolic}
                    />
                  </div>{' '}
                </div>

                <CustomInput2
                  label="Oxygen Saturation (%)"
                  name="oxygenSAturation"
                  placeholder='Enter oxygen saturation value'
                  description='Refers the percentage of oxygen-saturated haemoglobin in the blood.'
                  // onChange={setOxygen}
                />

                <div className="flex flex-row space-x-4 w-full ">
                  <CustomInput2
                    label="Weight (kg) "
                    name="weight"
                    placeholder='Enter height value'
                    description='The current weight of as recorded today.'
                    type="number"
                    // onChange={setWeight}
                  />
                  <CustomInput2
                    label="Height (cm) "
                    name="height"
                    placeholder='Enter height value'
                    description='The current height as recorded now.'
                    type="number"
                    // onChange={setheight}
                  />
                </div>
                {/* <div className="border-b border-slate-100 w-full mt-top-2 mt-b-2 font-bold" />
        <p className="font-bold capitalize">Other recordings</p>
        <CustomInput2
          label="MUAC"
          name="MUAC"
          // onChange={setMUAC}
        />
        <CustomInput2
          label="LMP"
          name="LMP"
          type='date'
          // onChange={setLMP}
        /> */}
                {/* <div className="border-b border-slate-100 w-full mt-top-2 mt-b-2" /> */}
                {/* <p>Pregnancy Details</p> */}

                {/* <CustomCheckbox
        label="Is Pregnant?"
        value={isPregnant}
        onChange={setIsPregnant}
      /> */}

                {/*  */}

                {/* {appointmentData
        ? (
        <div>
          <Button>Next</Button>{' '}
        </div>
          )
        : (
        <Button
          className="bg bg-slate-200 text-slate-700 shadow-none"
          onClick={async () => await addVitalSign(inputValues)}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
          Save
        </Button>
          )} */}
                <div className="flex w-full justify-end absolute bottom-4 right-4 ">
                  {vsData || vlData ? (
                    <Button
                      className="bg-slate-200 hover:bg-slate-100 shadow-none text-black"
                      onClick={() => {
                        handleNext()
                      }}
                      size={'sm'}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      className="bg bg-teal-600 shadow-none hover:bg-teal-500 text-white "
                      // onClick={async () => await addVitalSign(inputValues)}
                      type="submit"
                      disabled={isLoading}
                      size={'sm'}
                    >
                      {isLoading && (
                        <Loader2 className="animate-spin mr-2" size={18} />
                      )}
                      Save
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </Suspense>
      {/*  */}

      <RecentVitalSigns
      createdAt={latestVitalsData?.createdAt}
      diastolic={latestVitalsData?.diastolic}
      height={latestVitalsData?.height}
      pulseRate={latestVitalsData?.pulseRate}
      respiratoryRate={latestVitalsData?.respiratoryRate}
      systolic={latestVitalsData?.systolic}
      temperature={latestVitalsData?.temperature}
      weight={latestVitalsData?.weight}
      />
    </div>
  )
}

export default AddTriage
