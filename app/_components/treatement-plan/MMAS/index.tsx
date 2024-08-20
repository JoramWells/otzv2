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
import { useAddMmasFourMutation, useGetMmasFourByPatientIDQuery } from '@/api/treatmentplan/mmasFour.api'
import { useAddMmasEightMutation } from '@/api/treatmentplan/mmasEight.api'
import CardHeader from '@/app/users/patients/tab/steps/_components/CardHeader'

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
  const [isQuitFeelWorse, setIsQuitWorse]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitFeelBetter, setIsQuitBetter]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isTookMedYesterday, setIsTookYesterday]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitOutControl, setIsQuitControl]: [
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

  //
  const [isNever, setIsNever] = useState<boolean>(false)
  const [isOnce, setIsOnce] = useState<boolean>(false)
  const [isSometimes, setIsSometimes] = useState<boolean>(false)
  const [isUsually, setIsUsually] = useState<boolean>(false)
  const [isAllTime, setIsAllTime] = useState<boolean>(false)

  const [mmassFourScore, setMMASFourScore] = useState(0)
  const [mmassEightScore, setMMASEightScore] = useState(0)

  const inputValues = {
    isTookMedYesterday,
    isQuitOutControl,
    isUnderPressure,
    difficultyRemembering,
    mmassEightScore
  }

  //
  const inputValuesFour = {
    isForget,
    isCareless,
    isQuitFeelWorse,
    isQuitFeelBetter,
    mmassFourScore
  }

  const inputValuesEight = {
    patientID,
    patientVisitID: appointmentID,
    ...inputValues,
    ...inputValuesFour
  }

  const [addMmasFour, { isLoading, data: savedData }] = useAddMmasFourMutation()
  const [addMmasEight, { isLoading: isLoading8, data: mmas8Data }] = useAddMmasEightMutation()

  const { data: recentMMMASFourData } =
      useGetMmasFourByPatientIDQuery(patientID)

  console.log(recentMMMASFourData, 'mmasFour')

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

    const booleanStates = [isForget, isCareless, isQuitFeelWorse, isQuitFeelBetter]
    const newScore = booleanStates.reduce(
      (total, state) => total + (state ? 1 : 0),
      0
    )

    setMMASFourScore(newScore)

    const scoreValue = [-1, 1, 1, 0, 1 / 4, 1 / 2, 3 / 4, 1]

    const mmas8Scores = [isTookMedYesterday, isQuitOutControl, isUnderPressure, isNever, isOnce, isSometimes, isUsually, isAllTime]
    const new8Score = mmas8Scores.reduce(
      (total, state, idx) => total + (state ? scoreValue[idx] : 0),
      0
    )

    setMMASEightScore(new8Score + mmassFourScore)
  }, [formData, isAllTime, isCareless, isForget, isNever, isOnce, isQuitFeelBetter, isQuitFeelWorse, isQuitOutControl, isSometimes, isTookMedYesterday, isUnderPressure, isUsually, mmassFourScore])

  return (
    <>
      <div className="w-3/4 bg-white border border-slate-200 rounded-lg">
      <CardHeader
      header='MMAS'
      />
        <div className="flex flex-col p-2">
          <MmasFour
            mmassFourScore={mmassFourScore}
            isForget={isForget}
            setIsForget={setIsForget}
            isCareless={isCareless}
            setIsCareless={setIsCareless}
            isQuitWorse={isQuitFeelWorse}
            setIsQuitWorse={setIsQuitWorse}
            isQuitBetter={isQuitFeelBetter}
            setIsQuitBetter={setIsQuitBetter}
          />

          {(isForget || isCareless || isQuitFeelWorse || isQuitFeelBetter) && (
            <MmasEight
              mmassEightScore={mmassEightScore}
              isTookYesterday={isTookMedYesterday}
              setIsTookYesterday={setIsTookYesterday}
              isQuitControl={isQuitOutControl}
              setIsQuitControl={setIsQuitControl}
              isUnderPressure={isUnderPressure}
              setIsUnderPressure={setIsUnderPressure}
              isDifficultyRemembering={difficultyRemembering}
              setIsDifficultyRemembering={setIsDifficultyRemembering}
              isAllTime={isAllTime}
              isNever={isNever}
              isOnce={isOnce}
              isSometimes={isSometimes}
              isUsually={isUsually}
              setIsAllTime={setIsAllTime}
              setIsNever={setIsNever}
              setIsOnce={setIsOnce}
              setIsSometimes={setIsSometimes}
              setIsUsually={setIsUsually}
            />
          )}
        </div>
        <div className="w-full flex justify-end space-x-4 pr-4 pb-4">
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
            <div>
              {isForget || isCareless || isQuitFeelWorse || isQuitFeelBetter
                ? (
                <Button
                  className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
                  onClick={() => {
                    addMmasEight(inputValuesEight)
                  }}
                  disabled={isLoading8}
                >
                  {isLoading8 && (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  )}
                  Save
                </Button>
                  )
                : (
                <Button
                  className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
                  onClick={() => {
                    addMmasFour(inputValuesFour)
                  }}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  )}
                  Save
                </Button>
                  )}
            </div>
              )}
        </div>
      </div>
      <div className="w-1/3 bg-white rounded-lg p-4 flex items-start flex-grow-0">
        Recent tests
      </div>
    </>
  )
}

export default MMASForm
