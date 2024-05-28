/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'

import { useCallback } from 'react'
import { useGetHomeVisitReasonsQuery } from '@/api/homevisit/homeVisitReason.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'

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
}: TaskOneProps) => {
  const { data: frequencyData } = useGetAllHomeVisitFrequenciesQuery()
  const { data: userData } = useGetAllUsersQuery()
  const { data: reasonData } = useGetHomeVisitReasonsQuery()

  const frequencyOptions = useCallback(() => {
    return frequencyData?.map((item: any) => ({
      id: item.id,
      label: item.homeVisitFrequencyDescription
    }))
  }, [frequencyData])

  // reason
  const reasonOptions = useCallback(() => {
    return reasonData?.map((item: any) => ({
      id: item.id,
      label: item.homeVisitReasonDescription
    }))
  }, [reasonData])

  // users
  const usersOption = useCallback(() => {
    return userData?.map((item: any) => ({
      id: item.id,
      label: item.firstName
    }))
  }, [userData])

  return (
    <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
      <CustomSelect
        label="Reason for visit"
        data={reasonOptions()}
        onChange={setHomeVisitReason}
        value={homeVisitReason}
      />

      <CustomSelect
        label="Requested by"
        data={usersOption()}
        onChange={setRequestedBy}
        value={requestedBy}
      />

      <CustomInput
        label="Date Requested"
        value={dateRequested}
        onChange={setDateRequested}
        type="date"
      />

      {/*  */}

      <CustomSelect
        label="Frequency of home visit"
        data={frequencyOptions()}
        onChange={setFrequency}
        value={frequency}
      />
    </div>
  )
}

export default TaskOne
