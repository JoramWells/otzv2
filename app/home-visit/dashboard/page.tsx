'use client'

import { useGetAllHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import HomeVisitFreqPieChart from '@/components/Recharts/HomeVisitFreqPieChart'
import HomeVisitTypeChart from '@/components/Recharts/HomeVisitTypeChart'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React from 'react'
import { importConfigColumns } from '../columns'

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

  const filteredHomeVisit = (data != null) ? [...data] : []
  filteredHomeVisit.sort((a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime())

  const recentHomeVisit = filteredHomeVisit?.slice(0, 3)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 w-full">
        <div className="flex flex-row space-x-2">
          <HomeVisitTypeChart data={data ?? []} />
          <HomeVisitFreqPieChart data={data ?? []} />
        </div>

        {/*  */}
        <div className="p-4 mt-2 bg-white">
          <div>
            <CustomTable
              isSearch={false}
              data={recentHomeVisit ?? []}
              columns={importConfigColumns}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
