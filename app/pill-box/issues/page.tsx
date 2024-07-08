/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllUserNotificationsQuery } from '@/api/notifications/userNotification.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns, sentMessagesColumns } from './columns'
import { useGetAllPatientNotificationsQuery, useGetNotificationBYCategoryQuery } from '../../../api/notifications/patientNotification.api'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import socketIOClient, { type Socket } from 'socket.io-client'
import { NotificationProps } from '@/context/NotificationContext'
import useNotification from '@/hooks/useNotification'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const dataList = [
  {
    id: 1,
    label: 'Patient Settings'
  },
  {
    id: 2,
    label: 'Sent Messages'
  }

]

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: 'dashboard'
  }
]

const NotificationPage = () => {
  const [value, setValue] = useState(1)
  // const showNotification = useNotification()

  const { data: patientNotificationData } = useGetNotificationBYCategoryQuery({
    type: 'Refill'
  })

  // const { data: patientNotificationData } =
  //   useGetAllPatientNotificationsQuery()
  // const socket: Socket = socketIOClient("/api/appointment");

  // useEffect(() => {
  // if (data) {
  // setAppointments(data)
  // }
  // const socket: Socket = socketIOClient(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment:`)

  //   socket.on("notificationCreated", (socketData: NotificationProps) => {
  //     showNotification();
  //     // setAppointments(socketData)
  //     console.log(socketData);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [ showNotification]);
  console.log(patientNotificationData)
  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      {/* <div className="w-full flex-row flex space-x-4 mb-2 p-2 mt-2">
        {dataList.map((item) => (
          <Button
            key={item.id}
            className={`rounded-full shadow-none bg-slate-200 text-slate-500
          hover:bg-slate-100 ${item.id === value && 'bg-black text-white'}
          `}
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.label}
          </Button>
        ))}
      </div> */}

      <div className='p-2'>
        <div className='bg-white rounded-lg w-full p-2'>

            <CustomTable
              columns={sentMessagesColumns}
              data={patientNotificationData || []}
              isSearch={false}
            />
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
