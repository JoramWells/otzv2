/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomInput from '../forms/CustomInput'
import CustomSelect from '../forms/CustomSelect'

export interface TaskOneProps {
  homeVisitReason: string
  setHomeVisitReason: (val: string) => void
  requestedBy: string
  setRequestedBy: (val: string) => void
  dateRequested: string
  setDateRequested: (val: string) => void
  frequency: string
  setFrequency: (val: string) => void
}

const TaskOne = ({
  homeVisitReason,
  setHomeVisitReason,
  requestedBy,
  setRequestedBy,
  dateRequested,
  setDateRequested,
  frequency,
  setFrequency
}: TaskOneProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <CustomSelect
      label="Reason for visit"
      data={[]}
      onChange={setHomeVisitReason}
      value={homeVisitReason}
    />

    <CustomSelect
      label="Requested by"
      data={[]}
      onChange={setRequestedBy}
      value={requestedBy}
    />

    <CustomInput
      label="Date Requested"
      value={dateRequested}
      onChange={setDateRequested}
      type='date'
    />

    {/*  */}

    <CustomSelect
      label="Frequency of home visit"
      data={[]}
      onChange={setFrequency}
      value={frequency}
    />
  </div>
)

export default TaskOne
