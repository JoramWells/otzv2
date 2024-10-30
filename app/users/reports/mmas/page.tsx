'use client'

import { useGetAllMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomTab from '@/components/tab/CustomTab'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { columns } from './columns'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)
const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const categoryListData = [
  {
    id: 1,
    label: 'MMAS-4'
  },
  {
    id: 2,
    label: 'MMAS-8'
  }
]

const MMASPage = () => {
  const [tabValue, setTabValue] = useState('mmas-4')
  const { data } = useGetAllMmasFourQuery()
  console.log(data)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab
        categoryList={categoryListData}
        setValue={setTabValue}
        value={tabValue}
      />

      {/*  */}
      <div className="p-4">
        <div
        className='bg-white rounded-lg p-2'
        >
          <CustomTable
            columns={columns}
            data={data ?? []}
            // isLoading={isLoading}
            // filter={<FilterComponent />}
            // isSearch
          />
        </div>
      </div>
    </div>
  )
}

export default MMASPage
