'use client'

import { useGetAllHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import HomeVisitFreqPieChart from '@/components/Recharts/HomeVisitFreqPieChart'
import HomeVisitTypeChart from '@/components/Recharts/HomeVisitTypeChart'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React from 'react'

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

const Dashboard = () => {
  const { data } = useGetAllHomeVisitConfigQuery()

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div
      className='p-2 w-full'
      >
        <div className="flex flex-row space-x-2">
          <HomeVisitTypeChart data={data ?? []} />
          <HomeVisitFreqPieChart data={data ?? []} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
