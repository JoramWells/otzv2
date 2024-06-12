/* eslint-disable import/no-extraneous-dependencies */

import CustomInput from '@/components/forms/CustomInput'

export interface PlanProps {
  medicineStorage: string
  setMedicineStorage: (val: string) => void
  toolsAndCues: string
  setToolsAndCues: (val: string) => void
  goal: string
  setGoal: (val: string) => void

}
const Plan = ({

  medicineStorage,
  setMedicineStorage,
  toolsAndCues,
  setToolsAndCues,
  goal,
  setGoal

}: PlanProps) => {
  return (
    <div className="flex-1 border p-4 rounded-lg">

      {/*  */}
      <div>
        <CustomInput
          label="Which is the best place to keep medicines in order to adhere to this
        schedule?"
          value={medicineStorage}
          onChange={setMedicineStorage}
        />
      </div>

      {/*  */}
      <div>
        <CustomInput
          label="What tools and cues will you use to help with adherence?"
          value={toolsAndCues}
          onChange={setToolsAndCues}
        />
      </div>

      {/*  */}
      <div>
        <CustomInput
          label="What is the ultimate goal for this plan?"
          value={goal}
          onChange={setGoal}
        />
      </div>
    </div>
  )
}

export default Plan
