/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddEnhancedAdherenceMutation } from '@/api/treatmentplan/enhancedAdherence.api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

enum AdherenceImpressionProps {
  excellent = 'excellent',
  unsure = 'unsure',
  inadequate = 'inadequate'
}

const EnhancedAdherenceCounsellingForm = ({ score, adherence, prescriptionID, nextAppointmentDate }: { score: string, adherence: number, prescriptionID: string | null, nextAppointmentDate: Date }) => {
  const [addEnhancedAdherence, { isLoading }] = useAddEnhancedAdherenceMutation()

  const [treatmentMotivation, setTreatmentMotivation] = useState<string>('')
  const [barriersToAdherence, setBarriersToAdherence] = useState<string>('')
  const [isExcellent, setIsExcellent] = useState<boolean>(false)
  const [isUnsure, setIsUnsure] = useState<boolean>(false)
  const [isInadequate, setIsInadequate] = useState<boolean>(false)
  const [impression, setImpression] = useState<AdherenceImpressionProps>(AdherenceImpressionProps.excellent)
  const [plan, setPlan] = useState<string>('')

  useEffect(() => {
    setImpression(isExcellent ? AdherenceImpressionProps.excellent : isUnsure ? AdherenceImpressionProps.unsure : isInadequate ? AdherenceImpressionProps.inadequate : AdherenceImpressionProps.excellent)
  }, [isExcellent, isInadequate, isUnsure])

  function handleExcellentSelect (checked: boolean) {
    setIsExcellent(checked)
    setIsUnsure(!checked)
    setIsInadequate(!checked)
  }

  function handleUnsureSelect (checked: boolean) {
    setIsExcellent(!checked)
    setIsUnsure(checked)
    setIsInadequate(!checked)
  }

  function handleInadequateSelect (checked: boolean) {
    setIsExcellent(!checked)
    setIsUnsure(!checked)
    setIsInadequate(checked)
  }

  const inputValues = {
    prescriptionID,
    adherencePercentage: Math.round(adherence),
    treatmentMotivation,
    // barriersToAdherence: [barriersToAdherence],
    nextAppointmentDate,
    // plan,
    mmas8Score: score,
    impression,
    date: new Date()
  }

  const handleSubmit = async () => {
    await addEnhancedAdherence(inputValues)
  }

  return (
    <div className="flex flex-col space-y-4 bg-white flex-1 p-4 rounded-lg">
      {/* <div className="flex flex-col space-y-4 bg-slate-50 rounded-lg border border-slate-200 p-4">
                <div>
                  {' '}
                  Prescribed = Expected No. of Pills x Dispensed Pills{' '}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {' '}
                    {patientAdherence?.noOfPills} ={' '}
                    {patientAdherence?.expectedNoOfPills} +{' '}
                    {patientAdherence?.computedNoOfPills}{' '}
                  </div>
                  <div>
                    <Badge>Not Good</Badge>
                  </div>
                </div>
              </div> */}
      {/* <hr /> */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between">
          <h5 className="capitalize font-bold text-slate-700">
            Enhanced Adherence Counselling
          </h5>
          {/* {score ?

      } */}
          <div
            className="bg-purple-50 text-purple-500 border border-purple-200 font-bold flex flex-row
            p-1 rounded
                 justify-between"
          >
            <p className="text-[12px]">MMAS-8</p>
            {score}
          </div>
        </div>

        <div className="flex justify-between flex-row text-[12px] items-center text-orange-500 border border-orange-200 bg-orange-50 p-2 rounded-lg ">
          <p className="font-semibold">Adherence % (from pill count)</p>
          <span>{adherence}</span>
        </div>

        {/* <small>Discuss the details of this prescription.</small> */}
      </div>
      <hr />

      <div className="flex flex-col space-y-2">
        <label className="font-semibold text-slate-700 text-[14px]">
          Treatment motivation
        </label>

        <Textarea
          placeholder="Treatment motivation"
          className="shadow-none"
          onChange={(e) => {
            setTreatmentMotivation(e.target.value)
          }}
          value={treatmentMotivation}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="" className="text-slate-700 text-[14px] font-semibold">
          Barriers to adherence
        </label>
        <Textarea
          placeholder="Barriers to adherence"
          className="shadow-none"
          onChange={(e) => {
            setBarriersToAdherence(e.target.value)
          }}
          value={barriersToAdherence}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="" className="text-slate-700 text-[14px] font-semibold">
          Adherence Plan
        </label>
        <Textarea
          placeholder="Adherence plan"
          className="shadow-none"
          onChange={(e) => {
            setPlan(e.target.value)
          }}
          value={plan}
        />
      </div>

      <div>
        <label htmlFor="" className="text-slate-700 text-[14px] font-semibold">
          Your impression about current patients adherence
        </label>

        {isUnsure ? 'Excellent' : 'Not'}
        <div className="flex justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked: boolean) => {
                handleExcellentSelect(checked)
              }}
              checked={isExcellent}
            />

            <label
              htmlFor=""
              className="text-[12px] font-semibold text-slate-700"
            >
              Excellent
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked: boolean) => {
                handleUnsureSelect(checked)
              }}
              checked={isUnsure}
            />
            <label
              htmlFor=""
              className="text-[12px] font-semibold text-slate-700"
            >
              Unsure
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
            checked={isInadequate}
              onCheckedChange={(checked: boolean) => {
                handleInadequateSelect(checked)
              }}
            />
            <label
              htmlFor=""
              className="text-[12px] font-semibold text-slate-700"
            >
              Inadequate
            </label>
          </div>
        </div>
      </div>

      {/* <div>
        <h2>Actions</h2>
        <ol>
          <li>Assign Case Manager</li>
          <li>Discuss MDT</li>
        </ol>
      </div> */}

      <Button
        size={'sm'}
        className="bg-slate-100 hover:bg-slate-50 text-slate-700 border border-slate-200"
        onClick={handleSubmit}
      >

        {isLoading
          ? <Loader2 size={16} className='mr-2 animate-spin' />
          : <PlusIcon size={16} className="mr-2" />}
        <p className="text-[14px] font-semibold">Comment</p>
      </Button>
    </div>
  )
}

export default EnhancedAdherenceCounsellingForm
