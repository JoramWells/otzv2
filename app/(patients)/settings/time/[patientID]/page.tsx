/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useGetAllNotificationsQuery } from '@/api/notifications/notification.api'
import { useGetUserNotificationQuery } from '@/api/notifications/userNotification.api'
import CustomInput from '@/app/_components/forms/CustomInput'
import { type NotificationProps } from '@/app/_components/notify/NotificationComponent'
import AddNotificationDialog from '@/app/_components/patient/settings/AddNotificationDialog'
import { useEffect, useState } from 'react'

// notification type
// lab
// -lab  results updates
//  -lab appointments -vl
// viral load

// const dataList = [
//   {
//     id: 1,
//     label: 'Viral Load Collection'
//   },
//   {
//     id: 2,
//     label: 'Viral Load Update'
//   },
//   {
//     id: 3,
//     label: 'Daily Drug'
//   },
//   {
//     id: 4,
//     label: 'Daily Drug Confirmation'
//   },
//   {
//     id: 5,
//     label: 'Drug Reorder Level'
//   },
//   {
//     id: 6,
//     label: 'Drug Refill Date'
//   },
//   {
//     id: 7,
//     label: 'Events'
//   }
// ]

export interface UserNotificationData {
  id: string
  notificationID: string
  patientID: string
  notifications: NotificationProps
}

// export interface NotificationProps {
//   voice: boolean
//   sms: boolean
// }

const Settings = ({ params }: any) => {
  const patientID = params.patientID
  const [notificationID, setNotificationID] = useState('')

  const { data: userNotificationData } = useGetUserNotificationQuery(patientID)

  const handleClick = (id: string) => {
    setNotificationID(id)
  }

  const { data: notificationCategoryData } = useGetAllNotificationsQuery()

  console.log(userNotificationData, 'dtx')

  useEffect(() => {
    if (userNotificationData) {
      setNotificationID(userNotificationData[0]?.notificationID)
    }
  }, [userNotificationData])

  return (
    <div className="mt-12 p-4 flex flex-col space-y-4">
{/* <CustomInput
label='Mornin Medicine Time'
/> */}
    </div>
  )
}

export default Settings
