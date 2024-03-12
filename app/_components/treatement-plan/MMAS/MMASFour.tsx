/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomCheckbox from '../../forms/CustomCheckbox'

export interface MMASFourProps {
  isForget: boolean
  setIsForget: (forget: boolean) => void
  isCareless: boolean
  setIsCareless: (careless: boolean) => void
  isQuitWorse: boolean
  setIsQuitWorse: (worse: boolean) => void
  isQuitBetter: boolean
  setIsQuitBetter: (better: boolean) => void
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
  <div
  className='flex flex-col gap-y-6 border p-4 rounded-lg mt-4'
  >
    <CustomCheckbox
      label="Do you ever forget to take medicine?"
      onChange={setIsForget}
      value={isForget}
    />

    <CustomCheckbox
      label="Are you careless at times about taking your medicine?"
      value={isCareless}
      onChange={setIsCareless}
    />

    <CustomCheckbox
      label="Sometimes, if you feel worse when you take medicine, do you stop taking it?"
      value={isQuitWorse}
      onChange={setIsQuitWorse}
    />

    <CustomCheckbox
      label="When you feel better do you sometimes stop taking your medicine?"
      value={isQuitBetter}
      onChange={setIsQuitBetter}
    />
  </div>
)

export default MmasFour
