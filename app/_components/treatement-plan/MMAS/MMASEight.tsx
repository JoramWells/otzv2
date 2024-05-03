/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '../../../../components/forms/CustomCheckbox'

export interface MMASEightProps {
  isTookYesterday: boolean
  setIsTookYesterday: (yesterday: boolean) => void
  isQuitControl: boolean
  setIsQuitControl: (quit: boolean) => void
  isUnderPressure: boolean
  setIsUnderPressure: (pressure: boolean) => void
  isDifficultyRemembering: boolean
  setIsDifficultyRemembering: (remb: boolean) => void
}
const MmasEight = ({
  isTookYesterday,
  setIsTookYesterday,
  isQuitControl,
  setIsQuitControl,
  isUnderPressure,
  setIsUnderPressure,
  isDifficultyRemembering,
  setIsDifficultyRemembering
}: MMASEightProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
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

    <p
      style={{
        color: '#434343',
        fontSize: '16px'
      }}
      className='ml-6'
    >
      How ofter do you find difficulty remembering to take all your medications
    </p>
    {/*
    <Select
      style={{
        width: '100%',
        height: '39px'
      }}
      value={isDifficultyRemembering}
      onChange={(val) => setIsDifficultyRemembering(val)}
    >
      <Select.Option>Rarely</Select.Option>
    </Select> */}
  </div>
)

export default MmasEight
