'use client'

import { useGetAllHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import HomeVisitFreqPieChart from '@/components/Recharts/HomeVisitFreqPieChart'
import HomeVisitTypeChart from '@/components/Recharts/HomeVisitTypeChart'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { useCallback, useMemo, useState } from 'react'
import { importConfigColumns } from '../columns'
import { History, Pin } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  const filteredHomeVisit = useMemo(() => (data != null ? [...data] : []), [data])

  // const filteredHomeVisit =
  filteredHomeVisit.sort((a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime())

  const recentHomeVisit = filteredHomeVisit?.slice(0, 3)

  //
  const importantVisit = useCallback(() => {
    return filteredHomeVisit.filter(item => item?.PatientVisit?.Patient?.isImportant)
  }, [filteredHomeVisit])()

  const [tab, setTab] = useState(1)

  // console.log(filteredHomeVisit, 'dty')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 w-full">
        <div className="flex flex-row space-x-2">
          <HomeVisitTypeChart data={data ?? []} />
          <HomeVisitFreqPieChart data={data ?? []} />
        </div>

        {/*  */}
        <div className="p-2 mt-2 bg-white">
          <div className="flex flex-row space-x-2 mb-2">
            {[
              {
                id: 1,
                label: 'Pinned',
                icon: <Pin size={18} className="mr-2" />
              },
              {
                id: 2,
                label: 'Recent',
                icon: <History size={18} className="mr-2" />
              }
            ].map((item) => (
              <Button
                key={item.id}
                onClick={() => {
                  setTab(item.id)
                }}
                className={`text-slate-700 hover:bg-slate-50 bg-transparent hover:text-teal-600 rounded-none
                      ${
                        tab === item.id &&
                        'border-b-2 border-teal-600 text-teal-600'
                      }
                      `}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>

          <div>
            {tab === 1 && (
              <CustomTable
                isSearch={false}
                data={recentHomeVisit ?? []}
                columns={importConfigColumns}
              />
            )}

            {/*  */}
            {tab === 2 && (
              <CustomTable
                isSearch={false}
                data={importantVisit ?? []}
                columns={importConfigColumns}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
