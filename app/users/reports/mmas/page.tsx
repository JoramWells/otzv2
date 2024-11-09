'use client'

import { useGetAllMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomTab from '@/components/tab/CustomTab'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { Suspense, useState } from 'react'
import { columns, mmas8columns } from './columns'
import { useGetAllMmasEightQuery } from '@/api/treatmentplan/mmasEight.api'
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
  const { data: mmasEightData } = useGetAllMmasEightQuery()
  console.log(mmasEightData)
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab
        categoryList={categoryListData}
        setValue={setTabValue}
        value={tabValue}
      />

      {/*  */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-2">
          {tabValue === 'mmas-4' && (
            <CustomTable
              columns={columns}
              data={data ?? []}
              // isLoading={isLoading}
              // filter={<FilterComponent />}
              // isSearch
            />
          )}
          {tabValue === 'mmas-8' && (
            <CustomTable
              columns={mmas8columns}
              data={mmasEightData ?? []}
              // isLoading={isLoading}
              // filter={<FilterComponent />}
              // isSearch
            />
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default MMASPage
