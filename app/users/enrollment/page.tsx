/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { columns } from '../columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import CustomTab from '@/components/tab/CustomTab'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'

const categoryList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'OTZ'
  },
  {
    id: 3,
    label: 'OTZ Plus'
  },
  {
    id: 4,
    label: 'OVC'
  },
  {
    id: 5,
    label: 'PAMA'
  },
  {
    id: 6,
    label: 'PMTCT'
  }
]

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: ''
  },
  {
    id: '2',
    label: 'dashboard',
    link: 'dashboard'
  }
]

const Page = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data, isLoading } = useGetAllPatientsQuery()

  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      <CustomTable columns={columns} data={data || []} isLoading={isLoading} />
    </div>
  )
}

export default Page
