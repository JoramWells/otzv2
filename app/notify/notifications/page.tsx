'use client'
import { useGetAllUserNotificationsQuery } from '@/api/notifications/userNotification.api'
import Avatar from '@/app/_components/Avatar'
import { CustomTable } from '@/app/_components/table/CustomTable'
import moment from 'moment'
import { columns } from './columns'

const NotificationPage = () => {
  const { data } = useGetAllUserNotificationsQuery()

  // const filterData = data?.map(item => item.notifications?.filter(notification => Object.values(notification.notifications).some(value => value === true)))
  const dtx = data?.filter(item => {
    const notificationValue = Object.values(item.notifications)
    return notificationValue.includes(true)
  })
  console.log(dtx)
  return (
    <div className="mt-12 p-4 w-full flex flex-col items-center justify-center">

<CustomTable columns={columns}
data={dtx || []}
/>

    </div>
  )
}

export default NotificationPage
