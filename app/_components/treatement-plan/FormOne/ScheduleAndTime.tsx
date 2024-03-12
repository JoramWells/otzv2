/* eslint-disable import/no-extraneous-dependencies */

import { Divider } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'
import CustomTimeInput from '../../forms/CustomTimeInput'

export interface ScheduleAndTimeProps {
  morningPlace: string
  setMorningPlace: (val: string) => void
  morningTime: string
  setMorningTime: (val: string) => void
  eveningPlace: string
  setEveningPlace: (val: string) => void
  eveningTime: string
  setEveningTime: (val: string) => void
  medicineStorage: string
  setMedicineStorage: (val: string) => void
  toolsAndCues: string
  setToolsAndCues: (val: string) => void
  goal: string
  setGoal: (val: string) => void
}
const ScheduleAndTime = ({
  morningPlace,
  setMorningPlace,
  morningTime,
  setMorningTime,
  eveningPlace,
  setEveningPlace,
  eveningTime,
  setEveningTime,
  medicineStorage,
  setMedicineStorage,
  toolsAndCues,
  setToolsAndCues,
  goal,
  setGoal
}: ScheduleAndTimeProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <div>
      <p>
        Based on your schedule, what is the best time and place to take
        medicine?
      </p>
      <div className="flex flex-row gap-x-6">
        <CustomTimeInput label="Morning Time" />
        <CustomInput label="Enter Place" />
      </div>
    </div>

    {/*  */}
    <div className="flex flex-row gap-x-6">
      <CustomTimeInput label="Evening Time" />
      <CustomInput label="Enter Place" />
    </div>

    <Divider />

    <div>
      <p>
        If these routine changes during weekend (other days) how can this
        modified?
      </p>
      <div className="flex flex-row gap-x-6">
        <CustomTimeInput label="Morning Time" />
        <CustomInput label="Enter Place" />
      </div>
      <div className="flex flex-row gap-x-6">
        <CustomTimeInput label="Evening Time" />
        <CustomInput label="Enter Place" />
      </div>
    </div>

    {/*  */}
    <div>
      <CustomInput
        label="Which is the best place to keep medicines in order to adhere to this
        schedule?"
      />
    </div>

    {/*  */}
    <div>
      <CustomInput label="What tools and cues will you use to help with adherence?" />
    </div>

    {/*  */}
    <div>
      <CustomInput label="What is the ultimate goal for this plan?" />
    </div>
  </div>
)

export default ScheduleAndTime
