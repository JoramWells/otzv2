/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllUserNotificationsQuery } from '@/api/notifications/userNotification.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns, sentMessagesColumns } from './columns'
import { useGetAllPatientNotificationsQuery } from '../../../api/notifications/patientNotification.api'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import socketIOClient, { type Socket } from "socket.io-client";
import { NotificationProps } from '@/context/NotificationContext'
import useNotification from '@/hooks/useNotification'

const dataList = [
{
  id:1,
  label:'Patient Settings'
},
{
  id:2,
  label:'Sent Messages'
}
  
]


const NotificationPage = () => {
  const [value, setValue] = useState(1);
  const showNotification = useNotification();

  const { data } = useGetAllUserNotificationsQuery();

  const { data: patientNotificationData } =
    useGetAllPatientNotificationsQuery();
  // const socket: Socket = socketIOClient("/api/appointment");

  // const filterData = data?.map(item => item.notifications?.filter(notification => Object.values(notification.notifications).some(value => value === true)))
  const dtx = data?.filter((item: any) => {
    const notificationValue = Object.values(item.notifications);
    return notificationValue.includes(true);
  });

  // useEffect(() => {
  // if (data) {
  // setAppointments(data)
  // }
  const socket: Socket = socketIOClient("http://localhost:5005/");

  //   socket.on("notificationCreated", (socketData: NotificationProps) => {
  //     showNotification();
  //     // setAppointments(socketData)
  //     console.log(socketData);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [ showNotification]);
  console.log(patientNotificationData);
  return (
    <div className="mt-14 p-4 w-full flex flex-col items-center justify-center">
      <div className="w-full flex-row flex space-x-4 mb-4">
        {dataList.map((item) => (
          <Button
            key={item.id}
            className={`rounded-full shadow-none bg-slate-200 text-slate-500
          hover:bg-slate-100 ${item.id === value && "bg-black text-white"}
          `}
            onClick={() => setValue(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {value === 1 ? (
        <CustomTable columns={columns} data={dtx || []} />
      ) : (
        <CustomTable
          columns={sentMessagesColumns}
          data={patientNotificationData || []}
        />
      )}
    </div>
  );
}

export default NotificationPage
