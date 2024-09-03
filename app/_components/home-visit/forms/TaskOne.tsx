/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'

import { useCallback } from 'react'
import { useGetHomeVisitReasonsQuery } from '@/api/homevisit/homeVisitReason.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect2 from '@/components/forms/CustomSelect2'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
    <div className="flex flex-col gap-y-4 ">
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

      {/* <CustomSelect
        label="Frequency of home visit"
        data={frequencyOptions()}
        onChange={setFrequency}
        value={frequency}
      /> */}

      <Select
        onValueChange={(e) => {
          setFrequency(e)
        }}
        value={frequency}
        // name={name}
      >
        <SelectTrigger className="w-full shadow-none">
          {/* <SelectValue placeholder={placeholder} /> */}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {frequencyOptions()?.length === 0
              ? (
              <SelectItem value="No Data">No Data</SelectItem>
                )
              : (
              <>
                {frequencyOptions()?.map((item: { item: { id: string, label: string } }) => (
                  <SelectItem key={item.id} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </>
                )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {frequency.label}

    </div>
  )
}

export default TaskOne
