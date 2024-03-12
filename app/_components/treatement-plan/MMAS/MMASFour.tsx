/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import { Checkbox } from '@chakra-ui/react'

export interface MMASFourProps {
  isForget: string
  setIsForget: (forget: string) => void
  isCareless: string
  setIsCareless: (careless: string) => void
  isQuitWorse: string
  setIsQuitWorse: (worse: string) => void
  isQuitBetter: string
  setIsQuitBetter: (better: string) => void
}

const MmasFour = ({
  isForget,
  setIsForget,
  isCareless,
  setIsCareless,
  isQuitWorse,
  setIsQuitWorse,
  isQuitBetter,
  setIsQuitBetter
}: MMASFourProps) => (
  <div>

    <Checkbox>Do you ever forget to take medicine?</Checkbox>
    {/* <CustomCheckBox
      text="Do you ever forget to take your medicine?"
      isChecked={isForget}
      setIsChecked={setIsForget}
    />

    {/* <CustomCheckBox
      text="Are you careless at times about taking your medicine?"
      isChecked={isCareless}
      setIsChecked={setIsCareless}
    />

    {/* <CustomCheckBox
      text="Sometimes, if you feel worse when you take medicine, do you stop taking it?"
      isChecked={isQuitWorse}
      setIsChecked={setIsQuitWorse}
    /> */}

    {/* <CustomCheckBox
      text="When you feel better do you sometimes stop taking your medicine?"
      isChecked={isQuitBetter}
      setIsChecked={setIsQuitBetter}
    /> */}
  </div>
)

export default MmasFour
