/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Badge } from '@/components/ui/badge'
import { type MMASEightAttributes } from 'otz-types'
import { useEffect } from 'react'

export interface MMASEightProps {
  isTookYesterday: boolean
  setIsTookYesterday: (yesterday: boolean) => void
  isQuitControl: boolean
  setIsQuitControl: (quit: boolean) => void
  isUnderPressure: boolean
  setIsUnderPressure: (pressure: boolean) => void
  isDifficultyRemembering: boolean
  setIsDifficultyRemembering: (remb: boolean) => void
  isNever: boolean
  setIsNever: (remb: boolean) => void
  isOnce: boolean
  setIsOnce: (remb: boolean) => void
  isSometimes: boolean
  setIsSometimes: (remb: boolean) => void
  isUsually: boolean
  setIsUsually: (remb: boolean) => void
  isAllTime: boolean
  mmassEightScore: number
  setIsAllTime: (remb: boolean) => void
  data: MMASEightAttributes | undefined
}
const MmasEight = ({
  mmassEightScore,
  isTookYesterday,
  setIsTookYesterday,
  isQuitControl,
  setIsQuitControl,
  isUnderPressure,
  setIsUnderPressure,
  isDifficultyRemembering,
  setIsDifficultyRemembering,
  isAllTime,
  isNever,
  isOnce,
  isSometimes,
  isUsually,
  setIsAllTime,
  setIsNever,
  setIsOnce,
  setIsSometimes,
  setIsUsually,
  data
}: MMASEightProps) => {
  const handleFrequencyChange = (setter: (val: boolean) => void) => (value: boolean) => {
    setIsAllTime(false)
    setIsNever(false)
    setIsOnce(false)
    setIsSometimes(false)
    setIsUsually(false)
    setter(value)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data) {
      const { difficultyRemembering, isQuitOutControl, isTookMedYesterday, isUnderPressure } = data
      setIsDifficultyRemembering(difficultyRemembering as unknown as boolean)
      setIsQuitControl(isQuitOutControl)
      setIsTookYesterday(isTookMedYesterday)
      setIsUnderPressure(isUnderPressure)
    }
  }, [data, setIsDifficultyRemembering, setIsQuitControl, setIsTookYesterday, setIsUnderPressure])

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="flex justify-between items-center w-full border-b border-slate-200 pl-4 pr-4 p-2">
        <p className="font-bold ">MMAS-8</p>
        <div className="flex space-x-4 justify-between  items-center text-[12px] ">
          {mmassEightScore === 0 && (
            <Badge
              // className='text-red-500'
              className="font-bold bg-green-50 text-green-500 rounded-full shadow-none border-green-200"
            >
            {mmassEightScore}  Good
            </Badge>
          )}
          {mmassEightScore > 0 && mmassEightScore <= 2 && (
            <Badge className="text-orange-500 font-bold bg-orange-50 rounded-full shadow-none border border-orange-200"> {mmassEightScore} INADEQUATE</Badge>
          )}
          {mmassEightScore > 2 && mmassEightScore <= 8 && (
            <Badge className="text-red-500 font-bold bg-red-50 border-red-200 border rounded-full shadow-none"> {mmassEightScore} POOR</Badge>
          )}
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col space-y-1">
        <CustomCheckbox
          label="Did you take your medicine yesterday?"
          value={isTookYesterday}
          onChange={setIsTookYesterday}
        />
        <hr />

        <CustomCheckbox
          label="When you feel your
          symptoms are out of control, do you sometimes stop taking your medicine?"
          value={isQuitControl}
          onChange={setIsQuitControl}
        />
        <hr />

        <CustomCheckbox
          label="Taking medicine is a real inconvenience for some people. Do you feel under
          pressure about sticking to your treatment plan?"
          value={isUnderPressure}
          onChange={setIsUnderPressure}
        />
        <hr />

        <div>
          <p className="font-bold text-[14px] ">
            How ofter do you find difficulty remembering to take all your
            medications ?
          </p>
          <div className="grid grid-cols-2 gap-2 ">
            <CustomCheckbox
              label="A. Never/Rarely"
              description="0 point(s)"
              value={isNever}
              onChange={handleFrequencyChange(setIsNever)}
            />
            <CustomCheckbox
              label="B. Once in a while"
              description="1/4 point(s)"
              value={isOnce}
              onChange={handleFrequencyChange(setIsOnce)}
            />
            <CustomCheckbox
              label="C. Sometimes"
              description="1/2 point(s)"
              value={isSometimes}
              onChange={handleFrequencyChange(setIsSometimes)}
            />
            <CustomCheckbox
              label="D. Usually"
              description="3/4 point(s)"
              value={isUsually}
              onChange={handleFrequencyChange(setIsUsually)}
            />
            <CustomCheckbox
              label="E. All the time"
              description="1 point(s)"
              value={isAllTime}
              onChange={handleFrequencyChange(setIsAllTime)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MmasEight
