/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation, useGetVitalSignByPatientIDQuery } from '@/api/vitalsigns/vitalSigns.api'
// import CustomInput from '@/components/forms/CustomInput'
import CustomInput2 from '@/components/forms/CustomInput2'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarCheck2, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AdultSchema, InfantSchema } from './type'
import moment from 'moment'
import { CollapseButton } from '@/components/CollapseButton'
import { calculateBMI } from '@/utils/calculateBMI'
import { Badge } from '@/components/ui/badge'

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

  useEffect(() => {
    if (vsData) {
      handleNext()
    }
  }, [vsData, handleNext])

  const methods = useForm<InputProps>({
    resolver: zodResolver(age <= 1 ? InfantSchema : AdultSchema)
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
    <div className="flex items-start justify-between space-x-4 ">
      <div className="w-3/4 bg-white rounded-lg">
        <div className="flex justify-between items-center w-full border-b border-slate-100 pr-4 p-2 bg-slate-200 rounded-t-lg">
          <p className=" text-lg font-bold">Vital Sign</p>
          <p className="text-[14px] text-slate-500 ">
            {age < 9 ? <Badge className='shadow-none'>Paed</Badge> : <Badge className='shadow-none'>Adult</Badge> }
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            className="p-4 rounded-lg flex flex-col space-y-2"
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
              <div className="flex flex-row w-1/2 space-x-4 items-center">
                <CustomInput2
                  label="Systolic"
                  name="systolic"
                  // onChange={setSystolic}
                />
                <div className="mt-2 text-slate-500 ">/</div>
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

            <div className="flex flex-row space-x-4 w-1/2 ">
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
                  className="bg bg-slate-200 text-black shadow-none hover:bg-slate-100 "
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
      <div className="w-1/3 bg-white rounded-lg p-2">
        <div className="flex justify-between items-center w-full border p-2">
          <p className="text-[14px] font-bold ">Recent Vitals</p>
          <div className="flex justify-between items-center space-x-2 text-slate-500 text-[12px] ">
            <CalendarCheck2 size={15} />
            <p>{moment(latestVitalsData?.createdAt).format('ll')}</p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full p-2 text-[14px] ">
          <p className=" text-slate-500">Temperature</p>
          <p className="font-bold">{latestVitalsData?.temperature} °C</p>
        </div>
        <div className="w-full border-b border-slate-100" />

        <div className="flex justify-between items-center w-full p-2 text-[14px] ">
          <span className="text-slate-500 ">Pulse Rate</span>
          <p className="font-bold">{latestVitalsData?.pulseRate} bpm</p>
        </div>
        <div className="w-full border-b border-slate-100" />

        <div className="flex justify-between items-center w-full p-2 text-[14px] ">
          <span className="text-slate-500 ">Respiratory Rate</span>
          <span className="font-bold">
            {latestVitalsData?.respiratoryRate} bpm
          </span>
        </div>
        <div className="w-full border-b border-slate-100" />
        <CollapseButton label="Blood Pressure">
          <div className="w-full flex items-center space-x-4">
            <div>
              <p className="text-[14px] ">Systolic</p>
              <p className="font-bold">{latestVitalsData?.systolic}</p>
            </div>
            <p>/</p>
            <div>
              <p className="text-[14px] ">Diastolic</p>
              <p className="font-bold">{latestVitalsData?.diastolic}</p>
            </div>
          </div>
        </CollapseButton>
        <div className="w-full border-b border-slate-100" />

        <CollapseButton label="BMI">
          <div className="w-full flex items-center space-x-4 justify-between">
            <div className="w-full flex items-center space-x-4">
              <div>
                <p>Weight</p>
                <p className="font-bold">
                  {latestVitalsData?.weight}
                  <span className="text-[14px]">kg</span>
                </p>
              </div>
              <p>/</p>
              <div>
                <p>Height</p>
                <p className="font-bold">
                  {latestVitalsData?.height}
                  <span className="text-[14px]">cm</span>
                </p>
              </div>
            </div>
            <div>
              {calculateBMI(latestVitalsData?.weight, latestVitalsData?.height)}
            </div>
          </div>
        </CollapseButton>
      </div>
    </div>
  )
}

export default AddTriage
