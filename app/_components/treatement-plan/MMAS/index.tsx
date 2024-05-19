/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'

import MmasFour from './MMASFour'
import MmasEight from './MMASEight'
import { useAddMmasMutation } from '@/api/treatmentplan/mmas.api'
import { Button } from '@/components/ui/button'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  activeStep: number
};

const MMASForm = ({
  patientID,
  handleNext,
  handleBack,
  activeStep
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
  const [isDifficultyRemembering, setIsDifficultyRemembering]: [
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
    isDifficultyRemembering
  }

  const [addMmas, { isLoading }] = useAddMmasMutation()

  return (
    <div
      style={{
        width: '100%'
      }}
    >
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
      <MmasEight
        isTookYesterday={isTookYesterday}
        setIsTookYesterday={setIsTookYesterday}
        isQuitControl={isQuitControl}
        setIsQuitControl={setIsQuitControl}
        isUnderPressure={isUnderPressure}
        setIsUnderPressure={setIsUnderPressure}
        isDifficultyRemembering={isDifficultyRemembering}
        setIsDifficultyRemembering={setIsDifficultyRemembering}
      />

      <div>
        <Button
          onClick={() => {
            handleBack()
          }}
        >
          Next
        </Button>
        <Button
          onClick={() => {
            handleNext()
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default MMASForm
