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
    <div className="flex flex-col gap-y-4 p-4 pt-0 ">
      <CustomSelect
        label="Reason for visit"
        description="The reason for this home visit"
        data={reasonOptions()}
        onChange={setHomeVisitReason}
        value={homeVisitReason}
      />

      <CustomInput
        label="Date Requested"
        description='When was this visit requested'
        value={dateRequested}
        onChange={setDateRequested}
        type="date"
      />

      {/*  */}

      <CustomSelect
        label="Frequency of visit"
        description='Number of times this patient will be visited?'
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
