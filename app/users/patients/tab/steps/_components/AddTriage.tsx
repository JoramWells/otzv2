/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation } from '@/api/vitalsigns/vitalSigns.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const AddTriage = ({ patientID }: { patientID: string }) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')

  //
  const [temperature, setTemperature] = useState('')
  const [pulseRate, setPulseRate] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [systolic, setSystolic] = useState('')
  const [respiratoryRate, setRespiratoryRate] = useState('')
  const [oxygen, setOxygen] = useState('')
  const [height, setheight] = useState('')
  const [weight, setWeight] = useState('')
  const [MUAC, setMUAC] = useState('')
  const [LMP, setLMP] = useState('')
  // const [isPregnant, setIsPregnant] = useState(false)

  const inputValues = {
    patientID,
    temperature,
    weight,
    height,
    systolic,
    diastolic,
    muac: MUAC,
    oxygenSAturation: oxygen,
    pulseRate,
    respiratoryRate,
    patientVisitID: appointmentID
  }

  //
  const [addVitalSign, { isLoading }] = useAddVitalSignMutation()
  return (
    <div className="p-2 rounded-lg flex flex-col space-y-4">
      <CustomInput
        label="Temperature"
        value={temperature}
        onChange={setTemperature}
      />

      <div
      className='w-full flex justify-between items-center space-x-8'
      >
        <CustomInput
          label="Pulse Rate"
          value={pulseRate}
          onChange={setPulseRate}
        />
        <CustomInput
          label="Respiratory Rate"
          value={respiratoryRate}
          onChange={setRespiratoryRate}
        />
      </div>

      <div>
        <p className="font-bold mb-1">Blood Pressure</p>
        <div className="flex flex-row w-full space-x-4 items-center">
          <CustomInput
            label="Systolic"
            value={systolic}
            onChange={setSystolic}
          />
          <CustomInput
            label="Diastolic"
            value={diastolic}
            onChange={setDiastolic}
          />
        </div>{' '}
      </div>

      <CustomInput
        label="Oxygen Saturation"
        value={oxygen}
        onChange={setOxygen}
      />

      <div className="flex flex-row space-x-4">
        <CustomInput label="Weight" value={weight} onChange={setWeight} />
        <CustomInput label="Height" value={height} onChange={setheight} />
      </div>
      <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2 font-bold" />
      <p className="font-bold capitalize">Other recordings</p>
      <CustomInput label="MUAC" value={MUAC} onChange={setMUAC} />
      <CustomInput label="LMP" value={LMP} onChange={setLMP} />
      {/* <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2" /> */}
      {/* <p>Pregnancy Details</p> */}

      {/* <CustomCheckbox
        label="Is Pregnant?"
        value={isPregnant}
        onChange={setIsPregnant}
      /> */}

      {/*  */}

      <Button
        className="bg bg-slate-200 text-slate-700 shadow-none"
        onClick={async () => await addVitalSign(inputValues)}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
        Save
      </Button>
    </div>
  )
}

export default AddTriage
