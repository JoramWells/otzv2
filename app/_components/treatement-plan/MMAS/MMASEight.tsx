/* eslint-disable import/no-extraneous-dependencies */

import { Checkbox } from '@chakra-ui/react'

export interface MMASEightProps {
  isTookYesterday: string
  setIsTookYesterday: (yesterday: string) => void
  isQuitControl: string
  setIsQuitControl: (quit: string) => void
  isUnderPressure: string
  setIsUnderPressure: (pressure: string) => void
  isDifficultyRemembering: string
  setIsDifficultyRemembering: (remb: string) => void
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
  <div>
    <Checkbox>Did you take your medicine yesterday?</Checkbox>
    {/* <CustomCheckBox
      text="Did you take your medicine yesterday?"
      isChecked={isTookYesterday}
      setIsChecked={setIsTookYesterday}
    /> */}

    {/* <CustomCheckBox
      text="When you feel your
          symptoms are out of control, do you sometimes stop taking your medicine?"
      isChecked={isQuitControl}
      setIsChecked={setIsQuitControl}
    />

    <CustomCheckBox
      text="Taking medicine is a real inconvenience for some people. Do you feel under
          pressure about sticking to your treatment plan?"
      isChecked={isUnderPressure}
      setIsChecked={setIsUnderPressure}
    />

    <p
      style={{
        color: '#434343',
        fontSize: '16px'
      }}
    >
      How ofter do you find difficulty remembering to take all your medications
    </p>
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
