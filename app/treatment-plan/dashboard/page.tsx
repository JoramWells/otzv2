/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { useGetFullDisclosureTrackerByStatusQuery, useGetPartialDisclosureTrackerByStatusQuery } from '@/api/treatmentplan/disclosureTracker.api'
import { useGetRecentTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useUserContext } from '@/context/UserContext'
import React from 'react'
import RecentTimeAndWorkSchedule from '../_components/RecentTimeAndWorkSchedule'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomPieChart from '@/app/_components/charts/CustomPieChart'

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
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'Disclosure',
    link: ''
  }
]

function countStatus (data?: any[]) {
  return data?.reduce((acc, item) => {
    if (acc[item.status]) {
      acc[item.status] += Number(item.count)
    } else {
      acc[item.status] = Number(item.count)
    }
    return acc
  }, {})
}

const statusCountPie = (
  data: Array<{ status: string, count: string }>
): Array<{ status: string, count: string }> => {
  const resultCount = data?.reduce<Record<string, { status: string, count: string }>>((acc, item) => {
    if (acc[item.status]) {
      acc[item.status].count += Number(item.count)
    } else {
      acc[item.status] = { status: item.status, count: Number(item.count) as unknown as string }
    }
    return acc
  }, {})
  return Object.values(resultCount)
}

export function DisclosureComponent ({ completed, inProgress, notBegan, title }: {
  completed: string
  inProgress: string
  notBegan: string
  title: string
}) {
  return (
    <div className="">
      <div
      className='mb-1'
      >
        <p className="text-slate-800 text-[14px] font-semibold">{title}</p>
      </div>
      <div
        className="p-4 flex flex-row items-center space-x-4
          border rounded-lg justify-between
          "
      >
        <div className="h-full border p-1" />

        <div className="">
          <p className="text-[14px] text-slate-500">Completed</p>
          <p className="text-[16px] font-semibold text-slate-700">
            {completed ?? 0}
          </p>
        </div>
        <div className="h-full border p-1" />
        <div>
          <p className="text-[14px] text-slate-500">In Progress</p>
          <p className="text-[16px] font-semibold text-slate-700">
            {inProgress ?? 0}
          </p>
        </div>
        <div className="h-full border p-1" />

        <div>
          <p className="text-[14px] text-slate-500">Not Began</p>
          <p className="text-[16px] font-semibold text-slate-700">
            {notBegan ?? 0}
          </p>
        </div>
      </div>
    </div>
  )
}

const TreatmentPlanDashboard = () => {
  const { hospitalID } = useUserContext()
  // const { data } = useGetPartialDisclosureCategoryScoreQuery({
  //   hospitalID: hospitalID as string
  // },
  // {
  //   skip: hospitalID == null
  // }
  // )

  // const { data: fData } = useGetFullDisclosureCategoryScoreQuery(
  //   {
  //     hospitalID: hospitalID as string
  //   },
  //   {
  //     skip: hospitalID == null
  //   }
  // )

  const { data: groupCount } = useGetFullDisclosureTrackerByStatusQuery({
    hospitalID: hospitalID as string
  }, {
    skip: hospitalID == null
  })

  const { data: pData } = useGetPartialDisclosureTrackerByStatusQuery(
    {
      hospitalID: hospitalID as string
    },
    {
      skip: hospitalID == null
    }
  )

  const partialStatusCount = countStatus(pData)

  //
  const fullStatusCount = countStatus(groupCount)

  //
  const { data: recentTimeAndData } = useGetRecentTimeAndWorkQuery({
    hospitalID: hospitalID as string
  }, {
    skip: hospitalID == null
  })

  // console.log(pData, statusCountPie(pData), 'recent')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="rounded-lg bg-white p-2">
          <div className="flex flex-row space-x-2 p-2">
            {/*  */}
            <div
            className='flex flex-col space-y-2'
            >
              <DisclosureComponent
                title={'Partial Disclosure'}
                completed={partialStatusCount?.Completed}
                inProgress={partialStatusCount?.['In Progress']}
                notBegan={partialStatusCount?.['Not Began']}
              />
              {/* <CustomPieChart data={statusCountPie(pData) ?? []} /> */}
            </div>

            {/*  */}
            <DisclosureComponent
              title={'Full Disclosure'}
              completed={fullStatusCount?.Completed}
              inProgress={fullStatusCount?.['In Progress']}
              notBegan={fullStatusCount?.['Not Began']}
            />
            {/*  */}
          </div>
          {/* {data?.map((item, idx) => (
            <div
              className="border border-slate-200 rounded-lg w-1/4 bg-white flex flex-row m-2 p-2 items-center justify-between
            "
              key={idx}
            >
              <div className="flex flex-row space-x-2 items-center">
                <Trophy size={16} />
                <p className="text-[12px] font-semibold text-slate-800">
                  {item?.status}
                </p>
              </div>
              <div>
                <div className="flex flex-row space-x-1">
                  <p className="text-slate-500 text-[12px] font-semibold">
                    Total
                  </p>
                  <p className="text-[12px] text-slate-500">{item?.count}</p>
                </div>
                <div className="flex flex-row space-x-1 text-[12px] text-slate-500">
                  <p className="font-semibold">Last updated</p>
                  <p className="text-[12px] text-slate-500">
                    {moment(item?.latestCreatedAt).format('ll')}
                  </p>
                </div>
              </div>
            </div>
          ))} */}
          <RecentTimeAndWorkSchedule data={recentTimeAndData} />
        </div>

        {/*  */}
        {/* <div>
          <p>Full Disclosure</p>
          {fData?.map((item) => (
            <div
              className="border border-slate-200 rounded-lg w-1/4 bg-white flex flex-row m-2 p-2 items-center justify-between
            "
              key={item.id}
            >
              <div className="flex flex-row space-x-2 items-center">
                <Trophy size={16} />
                <p className="text-[12px] font-semibold text-slate-800">
                  {item?.status}
                </p>
              </div>
              <div>
                <div className="flex flex-row space-x-1">
                  <p className="text-slate-500 text-[12px] font-semibold">
                    Total
                  </p>
                  <p className="text-[12px] text-slate-500">{item?.count}</p>
                </div>
                <div className="flex flex-row space-x-1 text-[12px] text-slate-500">
                  <p className="font-semibold">Last updated</p>
                  <p className="text-[12px] text-slate-500">
                    {moment(item?.latestCreatedAt).format('ll')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default TreatmentPlanDashboard
