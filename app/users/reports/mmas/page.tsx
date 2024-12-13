/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { type ExtendedMMASFourInterface, useGetAllMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomTab from '@/components/tab/CustomTab'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { columns, mmas8columns } from './columns'
import { useGetAllMmasEightQuery } from '@/api/treatmentplan/mmasEight.api'
import { useUserContext } from '@/context/UserContext'
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
  const { hospitalID } = useUserContext()
  //   const [] = useState()
  const [mmasFourData, setMMASFourData] = useState<ExtendedMMASFourInterface[]>([])
  const [total, setTotal] = useState<number | undefined>(0)
  const { data } = useGetAllMmasFourQuery({
    hospitalID: hospitalID as string,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  },
  {
    skip: hospitalID == null
  }
  )

  useEffect(() => {
    if (data != null) {
      setMMASFourData(data.data)
      setTotal(data?.total)
    }
  }, [data])
  const { data: mmasEightData } = useGetAllMmasEightQuery()
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
        <div className="bg-white rounded-lg p-2">
          {tabValue === 'mmas-4' && (
            <CustomTable
              columns={columns}
              data={mmasFourData ?? []}
              total={total}
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
    </div>
  )
}

export default MMASPage
