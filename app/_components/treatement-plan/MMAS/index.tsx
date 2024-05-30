/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState, useEffect } from 'react'

import MmasFour from './MMASFour'
import MmasEight from './MMASEight'
import { useAddMmasMutation, useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { Button } from '@/components/ui/button'
import { InfoIcon, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface DataProps {
  isForget: boolean
  isCareless: boolean
  isQuitWorse: boolean
  isQuitBetter: boolean
  isTookYesterday: boolean
  isQuitControl: boolean
  isUnderPressure: boolean
}
interface MMASProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
  formData: DataProps
};

const MMASForm = ({
  patientID,
  handleNext,
  handleBack,
  appointmentID,
  formData
}: MMASProps) => {
  const [isForget, setIsForget]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
  const [isCareless, setIsCareless]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitWorse, setIsQuitWorse]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitBetter, setIsQuitBetter]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isTookYesterday, setIsTookYesterday]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitControl, setIsQuitControl]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isUnderPressure, setIsUnderPressure]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [difficultyRemembering, setIsDifficultyRemembering]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)

  const inputValues = {
    isForget,
    isCareless,
    isQuitWorse,
    isQuitBetter,
    isTookYesterday,
    isQuitControl,
    isUnderPressure,
    difficultyRemembering,
    patientID,
    patientVisitID: appointmentID
  }

  const [addMmas, { isLoading, data: savedData }] = useAddMmasMutation()

  const [mmassFourScore, setMMASFourScore] = useState(0)

  useEffect(() => {
    if (formData) {
      setIsForget(formData.isForget)
      setIsCareless(formData.isCareless)
      setIsQuitWorse(formData.isQuitWorse)
      setIsQuitBetter(formData.isQuitBetter)
      setIsTookYesterday(formData.isTookYesterday)
      setIsQuitControl(formData.isQuitControl)
      setIsUnderPressure(formData.isUnderPressure)
    }

    const booleanStates = [
      isForget,
      isCareless,
      isQuitWorse,
      isQuitBetter
    ]
    const newScore = booleanStates.reduce((total, state) => total + (state ? 1 : 0), 0)
    setMMASFourScore(newScore)
  }, [formData, isCareless, isForget, isQuitBetter, isQuitWorse])

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="w-full">
        <div className="w-full justify-between items-center flex">
          <p className="font-bold mb-2">MMAS 4 Form</p>

          <div className="flex space-x-4 justify-between  items-center">
            <p
            // className='text-red-500'
            className='font-bold'
            >
             Score: {mmassFourScore}
            </p>
            {mmassFourScore === 0 && <div
            className='text-teal-600 font-bold'
            >Good</div> }
            {mmassFourScore > 0 && mmassFourScore <= 2 && <p
            className='text-orange-500 font-bold'
            >INADEQUATE</p>}
            {mmassFourScore > 2 && mmassFourScore <= 4 && <p
            className='text-red-500 font-bold'
            >POOR</p>}
          </div>
        </div>
        <MmasFour
          isForget={isForget}
          setIsForget={setIsForget}
          isCareless={isCareless}
          setIsCareless={setIsCareless}
          isQuitWorse={isQuitWorse}
          setIsQuitWorse={setIsQuitWorse}
          isQuitBetter={isQuitBetter}
          setIsQuitBetter={setIsQuitBetter}
        />
      </div>

      {(isForget || isCareless || isQuitWorse || isQuitBetter) && (
        <div className="w-full">
          <p className="font-bold mb-2">MMAS 8 Form</p>
          <MmasEight
            isTookYesterday={isTookYesterday}
            setIsTookYesterday={setIsTookYesterday}
            isQuitControl={isQuitControl}
            setIsQuitControl={setIsQuitControl}
            isUnderPressure={isUnderPressure}
            setIsUnderPressure={setIsUnderPressure}
            isDifficultyRemembering={difficultyRemembering}
            setIsDifficultyRemembering={setIsDifficultyRemembering}
          />
        </div>
      )}

      <div className="w-full flex justify-end space-x-4">
        <Button
          className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
          onClick={() => {
            handleBack()
          }}
        >
          Prev
        </Button>
        {formData || savedData
          ? (
          <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={() => {
              handleNext()
            }}
          >
            Next
          </Button>
            )
          : (
          <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={() => {
              addMmas(inputValues)
            }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </Button>
            )}
      </div>
    </div>
  )
}

export default MMASForm
