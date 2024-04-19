/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { columns } from '../columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import CustomTab from '@/app/_components/tab/CustomTab'
import { useState } from 'react'

const categoryList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Pending'
  },
  {
    id: 3,
    label: 'Rescheduled'
  },
  {
    id: 4,
    label: 'Upcoming'
  },
  {
    id: 5,
    label: 'Missed'
  }
]

const Page = () => {
  const [value, setValue] = useState<number>(1)
  const { data, isLoading } = useGetAllPatientsQuery()

  return (
    <div className="p-5 mt-12">
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />
      {['OTZ', 'OVC', 'PAMA', 'PMTCT'].map((item, idx) => (
        <div key={idx}>{item} </div>
      ))}
      <CustomTable columns={columns} data={data || []} isLoading={isLoading} />
    </div>
  )
}

export default Page
