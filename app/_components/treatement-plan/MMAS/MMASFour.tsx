/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Badge } from '@/components/ui/badge'
import { type MMASFourAttributes } from 'otz-types'
import { useEffect } from 'react'

export interface MMASFourProps {
  isForget: boolean
  setIsForget: (forget: boolean) => void
  isCareless: boolean
  setIsCareless: (careless: boolean) => void
  isQuitFeelWorse: boolean
  setIsQuitFeelWorse: (worse: boolean) => void
  isQuitFeelBetter: boolean
  mmassFourScore: number
  setIsQuitFeelBetter: (better: boolean) => void
  data: MMASFourAttributes | undefined
}

const MmasFour = ({
  isForget,
  setIsForget,
  isCareless,
  setIsCareless,
  isQuitFeelWorse,
  setIsQuitFeelWorse,
  isQuitFeelBetter,
  setIsQuitFeelBetter,
  mmassFourScore,
  data
}: MMASFourProps) => {
  useEffect(() => {
    if (data != null) {
      const {
        isCareless, isForget,
        isQuitFeelBetter, isQuitFeelWorse
      } = data
      setIsForget(isForget as boolean)
      setIsCareless(isCareless as boolean)
      setIsQuitFeelWorse(isQuitFeelWorse as boolean)
      setIsQuitFeelBetter(isQuitFeelBetter as boolean)
    }
  }, [data, setIsCareless, setIsForget, setIsQuitFeelBetter, setIsQuitFeelWorse])
  return (
    <div className="flex flex-col bg-white rounded-lg border border-slate-200 ">
      <div
        className="flex justify-between items-center w-full
    border-b border-slate-200 pr-4 pl-4 p-2"
      >
        <p className="font-bold ">MMAS-4</p>
        <div className="flex space-x-4 justify-between  items-center text-[12px] ">
          {mmassFourScore === 0 && (
            <Badge
              // className='text-red-500'
              className="font-bold bg-green-50 text-green-500 rounded-full shadow-none border-green-200"
            >
              {mmassFourScore} Good
            </Badge>
          )}
          {mmassFourScore > 0 && mmassFourScore <= 2 && (
            <Badge className="text-orange-500 font-bold bg-orange-50 rounded-full shadow-none border border-orange-200">
              {' '}
              {mmassFourScore} INADEQUATE
            </Badge>
          )}
          {mmassFourScore > 2 && mmassFourScore <= 4 && (
            <Badge className="text-red-500 font-bold bg-red-50 border-red-200 border rounded-full shadow-none">
              {' '}
              {mmassFourScore} POOR
            </Badge>
          )}
        </div>
      </div>
      <div className="flex space-y-1 flex-col">
        <CustomCheckbox
          label="Do you ever forget to take medicine?"
          onChange={setIsForget}
          value={isForget}
        />
        <hr />

        <CustomCheckbox
          label="Are you careless at times about taking your medicine?"
          value={isCareless}
          onChange={setIsCareless}
        />
        <hr />

        <CustomCheckbox
          label="Sometimes, if you feel worse when you take medicine, do you stop taking it?"
          value={isQuitFeelWorse}
          onChange={setIsQuitFeelWorse}
        />
        <hr />

        <CustomCheckbox
          label="When you feel better do you sometimes stop taking your medicine?"
          value={isQuitFeelBetter}
          onChange={setIsQuitFeelBetter}
        />
      </div>
    </div>
  )
}

export default MmasFour
