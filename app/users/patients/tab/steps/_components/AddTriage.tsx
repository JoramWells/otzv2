/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation } from '@/api/vitalsigns/vitalSigns.api'
// import CustomInput from '@/components/forms/CustomInput'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

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
  vlData
}: AddTriageProps) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const Schema = z.object({
    temperature: z.preprocess((value) => {
      const parsedVal = parseFloat(String(value))
      if (isNaN(parsedVal)) {
        return undefined
      }
      return parsedVal
    }, z.number()
      .min(-10, { message: 'Abnormal body temperature' })
      .max(40, { message: 'Temperature is high' })
      .refine(val => Number.isFinite(val), { message: 'Invalid body temperature' })),
    pulseRate: z.preprocess(value => {
      const parsedVal = parseFloat(String(value))
      if (isNaN(parsedVal)) {
        return undefined
      }
      return parsedVal
    }, z.number()
      .min(40, { message: 'Pulse rate must be at least 40 bpm' })
      .max(180, { message: 'Pulse rate must be at least 180 bpm' })
      .refine(val => Number.isFinite(val), { message: 'Invalid body temperature' })),

    diastolic: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(90, { message: 'Diastolic pressure must be at least 90 mmHg' })
      .max(200, { message: 'Diastolic pressure must be at most 200 mmHg' })
      .refine(val => Number.isFinite(val), { message: 'Invalid body temperature' })),

    systolic: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(60, { message: 'Systolic Pressure must be at least 60 mmHg' })
      .max(120, { message: 'Systolic pressure must be at most 120 mmHg' })
      .refine(val => Number.isFinite(val), { message: 'Invalid systolic value' })),

    respiratoryRate: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(12, { message: 'Respiratory rate must be at least 12 breaths per minute' })
      .max(25, { message: 'Respiratory rate must be at most 25 breaths per minute' })
      .refine(val => Number.isFinite(val), { message: 'Invalid respiratory rate value' })),

    oxygenSAturation: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(85, { message: 'Oxygen saturation must be at least 85%' })
      .max(100, { message: 'Oxygen saturation must be at most 100%' })
      .refine(val => Number.isFinite(val), { message: 'Invalid oxygen value' })),

    height: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(50, { message: 'Height must be at least 50 cm' })
      .max(250, { message: 'Height must be at most 250 cm' })
      .refine(val => Number.isFinite(val), { message: 'Invalid height value' })),

    weight: z.preprocess(value => parseFloat(String(value)), z.number()
      .min(3, { message: 'Weight must be at least 3 kg' })
      .max(300, { message: 'Weight must be at most 300kg' })
      .refine(val => Number.isFinite(val), { message: 'Invalid weight value' }))
    // MUAC: z.string(),
    // LMP: z.string()
  }).refine(data => data.systolic > data.diastolic, {
    message: 'Systolic pressure must be greater tan diastolic pressure',
    path: ['systolic']
  })

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

  useEffect(() => {
    if (vsData) {
      handleNext()
    }
  }, [vsData, handleNext])

  const methods = useForm<InputProps>({
    resolver: zodResolver(Schema)
  })

  //
  const onSubmit = async (data: any) => {
    const submitData = {
      patientID,
      patientVisitID: appointmentID,
      ...data
    }
    await addVitalSign(submitData)
  }

  const { handleSubmit } = methods

  return (
    <div>
      <div className="flex justify-between items-center w-full border-b border-slate-200 p-4 bg-slate-100 rounded-t-lg">
        <p className="font-bold">Vital Sign</p>
        <p>Last Updated:</p>
      </div>
      <FormProvider {...methods}>
        <form
          className="p-4 rounded-lg flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput2
            label="Temperature (°C)"
            name="temperature"
            type="number"
            // onChange={setTemperature}
          />

          <div className="w-full flex justify-between items-center space-x-8">
            <CustomInput2
              label="Pulse Rate (bpm)"
              name="pulseRate"
              // onChange={setPulseRate}
            />
            <CustomInput2
              label="Respiratory Rate"
              name="respiratoryRate"
              // onChange={setRespiratoryRate}
            />
          </div>

          <div>
            <p className="font-bold mb-1">Blood Pressure (mmHg)</p>
            <div className="flex flex-row w-full space-x-4 items-center">
              <CustomInput2
                label="Systolic"
                name="systolic"
                // onChange={setSystolic}
              />
              <CustomInput2
                label="Diastolic"
                name="diastolic"
                // onChange={setDiastolic}
              />
            </div>{' '}
          </div>

          <CustomInput2
            label="Oxygen Saturation (%)"
            name="oxygenSAturation"
            // onChange={setOxygen}
          />

          <div className="flex flex-row space-x-4">
            <CustomInput2
              label="Weight (kg) "
              name="weight"
              type="number"
              // onChange={setWeight}
            />
            <CustomInput2
              label="Height (cm) "
              name="height"
              type="number"
              // onChange={setheight}
            />
          </div>
          {/* <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2 font-bold" />
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
          {/* <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2" /> */}
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
          <div className="flex w-full justify-end">
            {vsData || vlData ? (
              <Button
                className="bg-slate-200 hover:bg-slate-100 shadow-none text-black"
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg bg-blue-500 text-white shadow-none hover:bg-blue-500 "
                // onClick={async () => await addVitalSign(inputValues)}
                type="submit"
                disabled={isLoading}
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
  )
}

export default AddTriage
