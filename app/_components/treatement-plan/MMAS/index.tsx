/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { type Dispatch, type SetStateAction, useState, useEffect, useCallback } from 'react'

import MmasFour from './MMASFour'
import MmasEight from './MMASEight'
import { useAddMmasMutation, useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, InfoIcon, Loader2 } from 'lucide-react'
import { useAddMmasFourMutation, useGetMmasFourByPatientIDQuery, useGetMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { useAddMmasEightMutation, useGetMmasEightQuery } from '@/api/treatmentplan/mmasEight.api'
import CardHeader from '@/app/users/patients/tab/steps/_components/CardHeader'
import { useRouter } from 'next/navigation'
import { type MMASFourAttributes } from 'otz-types'
import { useToast } from '@/components/ui/use-toast'

interface DataProps {
  isForget: boolean
  isCareless: boolean
  isQuitFeelWorse: boolean
  isQuitFeelBetter: boolean
  isTookYesterday: boolean
  isQuitControl: boolean
  isUnderPressure: boolean
}
interface MMASProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
  stepsLength: number
};

const MMASForm = ({
  patientID,
  handleNext,
  handleBack,
  appointmentID,
  stepsLength
}: MMASProps) => {
  const [isForget, setIsForget]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
  const [isCareless, setIsCareless]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitFeelWorse, setIsQuitFeelWorse]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [isQuitFeelBetter, setIsQuitFeelBetter]: [
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

  const { toast } = useToast()

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

  const { data: mmasData } = useGetMmasFourQuery(appointmentID as unknown as string)
  const { data: mmas8DataRecent } = useGetMmasEightQuery(appointmentID as unknown as string)

  const activeStep = 5

  const send = useCallback(
    (message: string) =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: message
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  useEffect(() => {
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
  }, [isAllTime, isCareless, isForget, isNever, isOnce, isQuitFeelBetter, isQuitFeelWorse, isQuitOutControl, isSometimes, isTookMedYesterday, isUnderPressure, isUsually, mmasData, mmassFourScore])

  const router = useRouter()

  useEffect(() => {
    if (savedData) {
      send('MMAS 4 saved successfully')
      console.log('MMAS 4 saved successfully')
    }
    if (mmas8Data) {
      send('MMAS 8 saved successfully')
    }
  }, [mmas8Data, savedData, send])

  useEffect(() => {
    if (activeStep === stepsLength && (mmas8Data || savedData)) {
      send('MMAS 8 saved successfully')
      router.push(`/users/patients/tab/dashboard/${patientID}`)
    }
    // handleNext()
  }, [handleNext, mmas8Data, patientID, router, savedData, send, stepsLength])

  return (
    <>
      <div className="w-3/4 bg-white border border-slate-200 rounded-lg">
        <CardHeader header="MMAS" />
        <div className="flex flex-col p-4 space-y-4">
          <MmasFour
            mmassFourScore={mmassFourScore}
            isForget={isForget}
            setIsForget={setIsForget}
            isCareless={isCareless}
            setIsCareless={setIsCareless}
            isQuitFeelWorse={isQuitFeelWorse}
            setIsQuitFeelWorse={setIsQuitFeelWorse}
            isQuitFeelBetter={isQuitFeelBetter}
            setIsQuitFeelBetter={setIsQuitFeelBetter}
            data={mmasData}
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
              data={mmas8DataRecent}
            />
          )}
        </div>
        <div className="w-full flex justify-end space-x-4 pr-4 pb-4">
          <Button
            className=" text-slate-500 shadow-none"
            variant={'outline'}
            onClick={() => {
              handleBack()
            }}
            size={'sm'}
          >
            <ChevronsLeft className="mr-2" size={18} />
            Back
          </Button>
          <div>
            {isForget || isCareless || isQuitFeelWorse || isQuitFeelBetter ? (
              <Button
                className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
                onClick={() => {
                  // handleSave(addMmasEight, inputValuesEight, mmas8Data)
                  addMmasEight(inputValuesEight)
                  // if (activeStep === stepsLength && mmas8Data) {
                  //   router.push(`/users/patients/tab/dashboard/${patientID}`)
                  // }
                }}
                size={'sm'}
                disabled={isLoading8}
              >
                {isLoading8 && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                {activeStep === stepsLength ? 'Complete' : 'Save'}
              </Button>
            ) : (
              <Button
                className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
                onClick={() => {
                  // handleSave(addMmasFour, inputValuesFour, savedData)
                  addMmasFour(inputValuesFour)
                  // if (activeStep === stepsLength && savedData) {
                  //   router.push(`/users/patients/tab/dashboard/${patientID}`)
                  // }
                }}
                size={'sm'}
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="animate-spin mr-2" size={18} />
                )}
                {activeStep === stepsLength ? 'Complete' : 'Save'}
              </Button>
            )}
          </div>
          <Button
            className=""
            onClick={() => {
              handleNext()
            }}
            variant={'outline'}
            size={'sm'}
          >
            Next
            <ChevronsRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
      <div className="w-1/3 bg-white rounded-lg p-4 flex items-start flex-grow-0">
        Recent testsx
        {stepsLength}
      </div>
    </>
  )
}

export default MMASForm
