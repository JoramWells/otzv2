/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddVitalSignMutation } from '@/api/vitalsigns/vitalSigns.api'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
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

interface FamilyPlanningProps {
  condoms: boolean
  emergencyContraceptive: boolean
  oralContraceptives: boolean
  injectable: boolean
  implant: boolean
  iud: boolean
  lam: boolean
  diaphragm: boolean
  fertilityAwareness: boolean
  tubalLitigation: boolean
  vasectomy: boolean
  other: boolean
  setEmergencyContraceptive: (val: boolean) => void
  setOralContraceptives: (val: boolean) => void
  setInjectable: (val: boolean) => void
  setIUD: (val: boolean) => void
  setLAM: (val: boolean) => void
  setDiaphragm: (val: boolean) => void
  setFertilityAwareness: (val: boolean) => void
  setTubalLitigation: (val: boolean) => void
  setCondoms: (val: boolean) => void
  setVasectomy: (val: boolean) => void
  setOther: (val: boolean) => void
  setImplant: (val: boolean) => void
}

const FamilyPanning = ({
  emergencyContraceptive,
  setEmergencyContraceptive,
  condoms,
  implant,
  setImplant,
  diaphragm,
  fertilityAwareness,
  injectable,
  iud,
  lam,
  oralContraceptives,
  other,
  setCondoms,
  setDiaphragm,
  setFertilityAwareness,
  setIUD,
  setInjectable,
  setLAM,
  setOralContraceptives,
  setOther,
  setTubalLitigation,
  setVasectomy,
  tubalLitigation,
  vasectomy
}: FamilyPlanningProps) => {
  return (
    <div className="pl-4 flex flex-col space-y-2">
      <CustomCheckbox
        label="Emergency Contraceptive"
        value={emergencyContraceptive}
        onChange={setEmergencyContraceptive}
      />
      <CustomCheckbox
        label="OralContraceptives"
        value={oralContraceptives}
        onChange={setOralContraceptives}
      />
      <CustomCheckbox
        label="Injectable"
        value={injectable}
        onChange={setInjectable}
      />
      <CustomCheckbox label="Implant" value={implant} onChange={setImplant} />
      <CustomCheckbox
        label="Intrauterine Device"
        value={iud}
        onChange={setIUD}
      />
      <CustomCheckbox
        label="Lactational Amenorrhea Methods"
        value={lam}
        onChange={setLAM}
      />
      <CustomCheckbox
        label="Diaphragm/Cervical Cap"
        value={diaphragm}
        onChange={setDiaphragm}
      />
      <CustomCheckbox
        label="Fertility Awareness"
        value={fertilityAwareness}
        onChange={setFertilityAwareness}
      />
      <CustomCheckbox
        label="Tubal Litigation"
        value={tubalLitigation}
        onChange={setTubalLitigation}
      />
      <CustomCheckbox label="Condoms" value={condoms} onChange={setCondoms} />
      <CustomCheckbox
        label="Vasectomy(Partner)"
        value={vasectomy}
        onChange={setVasectomy}
      />
      <CustomCheckbox label="Other" value={other} onChange={setOther} />
    </div>
  )
}

const Page = ({ params }: any) => {
  const { patientID } = params
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
  const [reason, setReason] = useState('')
  const [isPregnant, setIsPregnant] = useState(false)
  const [onFamilyPlanning, setonFamilyPanning] = useState(false)
  const [notOnFamilyPlanning, setNotOnFamilyPlanning] = useState(false)
  const [considersFamilyPlanning, setConsidersFamilyPlanning] = useState(false)
  const [emergencyContraceptive, setEmergencyContraceptive] = useState(false)
  const [condoms, setCondoms] = useState(false)
  const [implant, setImplant] = useState(false)
  const [diaphragm, setDiaphragm] = useState(false)
  const [injectable, setInjectable] = useState(false)
  const [iud, setIUD] = useState(false)
  const [lam, setLAM] = useState(false)
  const [other, setOther] = useState(false)
  const [tubalLitigation, setTubalLitigation] = useState(false)
  const [vasectomy, setVasectomy] = useState(false)
  const [fertilityAwareness, setFertilityAwareness] = useState(false)
  const [oralContraceptives, setOralContraceptives] = useState(false)

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

          {onFamilyPlanning && (
            <FamilyPanning
              condoms={condoms}
              diaphragm={diaphragm}
              emergencyContraceptive={emergencyContraceptive}
              fertilityAwareness={fertilityAwareness}
              implant={implant}
              injectable={injectable}
              iud={iud}
              lam={lam}
              oralContraceptives={oralContraceptives}
              other={other}
              setCondoms={setCondoms}
              setDiaphragm={setDiaphragm}
              setEmergencyContraceptive={setEmergencyContraceptive}
              setFertilityAwareness={setFertilityAwareness}
              setIUD={setIUD}
              setImplant={setImplant}
              setInjectable={setInjectable}
              setLAM={setLAM}
              setOralContraceptives={setOralContraceptives}
              setOther={setOther}
              setTubalLitigation={setTubalLitigation}
              setVasectomy={setVasectomy}
              tubalLitigation={tubalLitigation}
              vasectomy={vasectomy}
            />
          )}

          <CustomCheckbox
            label="Considers Family Planning"
            value={considersFamilyPlanning}
            onChange={setConsidersFamilyPlanning}
          />

          {considersFamilyPlanning && (
            <FamilyPanning
              condoms={condoms}
              diaphragm={diaphragm}
              emergencyContraceptive={emergencyContraceptive}
              fertilityAwareness={fertilityAwareness}
              implant={implant}
              injectable={injectable}
              iud={iud}
              lam={lam}
              oralContraceptives={oralContraceptives}
              other={other}
              setCondoms={setCondoms}
              setDiaphragm={setDiaphragm}
              setEmergencyContraceptive={setEmergencyContraceptive}
              setFertilityAwareness={setFertilityAwareness}
              setIUD={setIUD}
              setImplant={setImplant}
              setInjectable={setInjectable}
              setLAM={setLAM}
              setOralContraceptives={setOralContraceptives}
              setOther={setOther}
              setTubalLitigation={setTubalLitigation}
              setVasectomy={setVasectomy}
              tubalLitigation={tubalLitigation}
              vasectomy={vasectomy}
            />
          )}

          <CustomCheckbox
            label="Not Using Family Planning"
            value={notOnFamilyPlanning}
            onChange={setNotOnFamilyPlanning}
          />

          {notOnFamilyPlanning && (
            <div className="pl-4">
              <CustomSelect
              value={reason}
              onChange={setReason}
                data={[
                  {
                    id: 'Wants To get Pregnant',
                    label: 'Wants To get Pregnant'
                  },
                  {
                    id: 'Thinks cant Pregnant',
                    label: 'Wants To get Pregnant'
                  },
                  {
                    id: 'Not Sexually Active',
                    label: 'Not Sexually Active'
                  }
                ]}
              />
            </div>
          )}

          <Button className="bg bg-slate-200 text-slate-700 shadow-none"
          onClick={async () => await addVitalSign(inputValues)}
          disabled={isLoading}
          >
            {isLoading && <Loader2 className='animate-spin mr-2' size={18} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
