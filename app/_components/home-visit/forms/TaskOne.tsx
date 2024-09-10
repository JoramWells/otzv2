/* eslint-disable import/no-extraneous-dependencies */

import { useCallback } from 'react'
import { useGetHomeVisitReasonsQuery } from '@/api/homevisit/homeVisitReason.api'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'

export interface TaskOneProps {
  homeVisitReason: string
  setHomeVisitReason: (val: string) => void
  dateRequested: string
  setDateRequested: (val: string) => void
  frequency: string
  setFrequency: (val: string) => void
}

const TaskOne = ({
  homeVisitReason,
  setHomeVisitReason,
  dateRequested,
  setDateRequested,
  frequency,
  setFrequency
}: TaskOneProps) => {
  const { data: reasonData } = useGetHomeVisitReasonsQuery()

  // const selectOptions = {[
  //   {id:'Once', label:'Once'}
  // ]}

  // reason
  const reasonOptions = useCallback(() => {
    return reasonData?.map((item: any) => ({
      id: item.id,
      label: item.homeVisitReasonDescription
    }))
  }, [reasonData])

  return (
    <div className="flex flex-col gap-y-4 ">
      <CustomSelect
        label="Reason for visit"
        description="The reason for this home visit"
        data={reasonOptions()}
        onChange={setHomeVisitReason}
        value={homeVisitReason}
      />

      {/* <CustomSelect
        label="Requested by"
        data={usersOption()}
        onChange={setRequestedBy}
        value={requestedBy}
      /> */}

      <CustomInput
        label="Date Requested"
        value={dateRequested}
        onChange={setDateRequested}
        type="date"
      />

      {/*  */}

      <CustomSelect
        label="Frequency of home visit"
        // defaultValue='Once'
        data={[
          { id: 'Once', label: 'Once' },
          { id: 'Daily', label: 'Daily' },
          { id: 'Weekly', label: 'Weekly' },
          { id: 'Monthly', label: 'Monthly' },
          { id: 'Bimonthly', label: 'Bimonthly' }
        ]}
        onChange={setFrequency}
        value={frequency}
      />
    </div>
  )
}

export default TaskOne
