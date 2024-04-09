/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useGetAllNotificationsQuery } from '@/api/notifications/notification.api'
import { useGetUserNotificationQuery } from '@/api/notifications/userNotification.api'
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
      <p
      className='font-extrabold'
      >Time Settin</p>
    <ol>
      <li>Notifications</li>
      <li>Time</li>
      <li>Routine</li>
    </ol>
      <div className="w-full flex justify-between">
        <p>Notifications</p>
        <p>Settings</p>
      </div>

      <div className="flex flex-row w-full space-x-4">
        <div className="flex flex-col space-y-4 w-1/2">
          {notificationCategoryData?.map((item: NotificationProps) => (
            <div
              key={item.id}
              className={`border border-slate-200 p-2
        rounded-lg flex flex-col space-y-2 ${
          item.id === notificationID && 'bg-slate-100'
        }
        `}
              onClick={() => {
                handleClick(item.id)
              }}
            >
              <p>{item.notificationSubCategory.notificationSubCategoryName} </p>
              <p>
                {
                  item.notificationSubCategory.notificationCategory
                    .notificationDescription
                }{' '}
              </p>
              <p className="font-bold">{item.notificationDescription}</p>
            </div>
          ))}
        </div>

        {/*  */}
        <AddNotificationDialog
          patientID={patientID}
          notificationID={notificationID}
          userNotificationData={userNotificationData}
        />
      </div>
    </div>
  )
}

export default Settings
