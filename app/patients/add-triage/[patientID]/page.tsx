'use client'

import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[36px] rounded-none" />
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

const Page = () => {
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
  const [isPregnant, setIsPregnant] = useState(false)
  const [onFamilyPlanning, setonFamilyPanning] = useState(false)
  const [notOnFamilyPlanning, setNotOnFamilyPlanning] = useState(false)
  const [considersFamilyPlanning, setConsidersFamilyPlanning] = useState(false)
  return (
    <div className="p-2 ">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="w-full flex justify-center mt-2">
        <div className="w-1/2 bg-white p-4 rounded-lg flex flex-col space-y-4">
          <CustomInput
            label="Temperature"
            value={temperature}
            onChange={setTemperature}
          />

          <CustomInput
            label="Pulse Rate"
            value={pulseRate}
            onChange={setPulseRate}
          />

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
            label="Respiratory Rate"
            value={respiratoryRate}
            onChange={setRespiratoryRate}
          />

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
          <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2" />
          <p>Pregnancy Details</p>

          <CustomCheckbox
            label="Is Pregnant?"
            value={isPregnant}
            onChange={setIsPregnant}
          />

          {/*  */}
          <div className="border-b border-slate-200 w-full mt-top-2 mt-b-2" />
          <p>Family Planning</p>

          <CustomCheckbox
            label="On Family Planning"
            value={onFamilyPlanning}
            onChange={setonFamilyPanning}
          />

          <CustomCheckbox
            label="Not Using Family Planning"
            value={notOnFamilyPlanning}
            onChange={setNotOnFamilyPlanning}
          />

          <CustomCheckbox
            label="Considers Family Planning"
            value={considersFamilyPlanning}
            onChange={setConsidersFamilyPlanning}
          />
          <Button className="bg bg-slate-200 text-slate-700 shadow-none">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
