/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import CustomTab from '@/app/_components/tab/CustomTab'
import { useState } from 'react'

const dataList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Morning'
  },
  {
    id: 3,
    label: 'Evening'
  }
]

const AppointmentPage = () => {
  const [value, setValue] = useState<number>(1)
  const { data: patientsDueMorning } = useGetAllPillDailyUptakeQuery()

  console.log(patientsDueMorning, 'yu')

  return (
    <div className="p-5 mt-12 flex flex-col space-y-4">
      <h1 className="text-xl font-semibold">Pill Box Reminder</h1>

      <div>
        <p className="mb-2 font-semibold">Select Intake Time</p>

        <CustomTab categoryList={dataList} value={value} setValue={setValue} />
      </div>
      <CustomTable columns={columns} data={patientsDueMorning || []} />
    </div>
  )
}

export default AppointmentPage
