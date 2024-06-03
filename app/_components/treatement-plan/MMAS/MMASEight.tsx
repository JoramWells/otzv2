/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '@/components/forms/CustomCheckbox'

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
  setIsAllTime: (remb: boolean) => void
}
const MmasEight = ({
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
  setIsUsually
}: MMASEightProps) => {
  const handleFrequencyChange = (setter: (val: boolean) => void) => (value: boolean) => {
    setIsAllTime(false)
    setIsNever(false)
    setIsOnce(false)
    setIsSometimes(false)
    setIsUsually(false)
    setter(value)
  }
  return (
    <div className="flex flex-col gap-y-4">
      <CustomCheckbox
        label="Did you take your medicine yesterday?"
        value={isTookYesterday}
        onChange={setIsTookYesterday}
      />

      <CustomCheckbox
        label="When you feel your
          symptoms are out of control, do you sometimes stop taking your medicine?"
        value={isQuitControl}
        onChange={setIsQuitControl}
      />

      <CustomCheckbox
        label="Taking medicine is a real inconvenience for some people. Do you feel under
          pressure about sticking to your treatment plan?"
        value={isUnderPressure}
        onChange={setIsUnderPressure}
      />

      <div>
        <p>
          How ofter do you find difficulty remembering to take all your
          medications
        </p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <CustomCheckbox label="A. Never/Rarely" description="0 point(s)"
          value={isNever}
          onChange={handleFrequencyChange(setIsNever)}
          />
          <CustomCheckbox
            label="B. Once in a while"
            description="1/4 point(s)"
            value={isOnce}
            onChange={handleFrequencyChange(setIsOnce)}
          />
          <CustomCheckbox label="C. Sometimes" description="1/2 point(s)"
          value={isSometimes}
          onChange={handleFrequencyChange(setIsSometimes)}
           />
          <CustomCheckbox label="D. Usually" description="3/4 point(s)"
          value={isUsually}
          onChange={handleFrequencyChange(setIsUsually)}
          />
          <CustomCheckbox label="E. All the time" description="1 point(s)"
          value={isAllTime}
          onChange={(handleFrequencyChange(setIsAllTime))}
          />
        </div>
      </div>
    </div>
  )
}

export default MmasEight
