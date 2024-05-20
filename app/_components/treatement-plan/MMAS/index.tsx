/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'

import MmasFour from './MMASFour'
import MmasEight from './MMASEight'
import { useAddMmasMutation, useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
  activeStep: number
};

const MMASForm = ({
  patientID,
  handleNext,
  handleBack,
  activeStep,
  appointmentID
}: AddTriageProps) => {
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
  const { data: mmasData } = useGetMmasQuery(appointmentID)
  console.log(mmasData, 'kli')

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="w-full">
        <p className="font-bold mb-2">MMAS 4 Form</p>

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

      <div className="w-full flex justify-end space-x-4">
        <Button
          className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
          onClick={() => {
            handleBack()
          }}
        >
          Prev
        </Button>
        {mmasData || savedData
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
