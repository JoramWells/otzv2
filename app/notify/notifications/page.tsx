/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { useGetAllNotificationsQuery } from '@/api/notifications/notification.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import usePreprocessData from '@/hooks/usePreprocessData'
import React from 'react'
import { notificationColumns } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

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

const NotificationsPage = () => {
  const { hospitalID } = useUserContext()
  const { data: notificationData } = useGetAllNotificationsQuery({
    hospitalID: hospitalID as string,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  },
  {
    skip: hospitalID == null
  })
  const { data } = usePreprocessData(notificationData)
  console.log(notificationData)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="bg-white rounded-lg border border-slate-200">
          <div
          className=' flex flex-row items-center space-x-2'
          >
            <p>Notifications</p>
            {/* <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
              {total}
            </Badge> */}
          </div>
          <CustomTable columns={notificationColumns} data={data ?? []} />
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
