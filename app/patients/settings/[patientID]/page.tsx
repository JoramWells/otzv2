/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'

import { useGetAllNotificationsQuery } from '@/api/notifications/notification.api'
import { useGetAllNotificationTypesQuery } from '@/api/notifications/notificationTypes.api'
import { useGetUserNotificationQuery, useUpdateUserNotificationMutation } from '@/api/notifications/userNotification.api'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { type NotificationProps } from '@/app/_components/notify/NotificationComponent'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import { Switch } from '@/components/ui/switch'
import { Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

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

interface NotifyCardProps {
  label: string
  text: string
  isChecked?: boolean
  handleChecked?: () => void
}

const NotifyCard = ({ label, text, isChecked = false, handleChecked }: NotifyCardProps) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-bold">{label}</p>
          <p className="text-sm text-slate-500">{text}</p>
        </div>
        <Switch checked={isChecked} onCheckedChange={handleChecked} />
      </div>
      <Divider />
    </>
  )
}

const Settings = ({ params }: any) => {
  const patientID = params.patientID
  const [value, setValue] = useState('')

  const [notificationState, setNotificationState] = useState({
    voice: false,
    sms: false,
    whatsapp: false,
    push: false
  })

  const { data: userNotificationData } = useGetUserNotificationQuery(patientID)
  const [updateUserNotification] = useUpdateUserNotificationMutation()

  useEffect(() => {
    if (userNotificationData) {
      setNotificationState(userNotificationData?.notifications)
    }
  }, [userNotificationData])

  const handleNotificationToggle = async (key: string) => {
    const updatedNotification = { ...notificationState, [key]: !notificationState[key] }
    setNotificationState(updatedNotification)
    await updateUserNotification({
      id: userNotificationData?.id,
      patientID,
      notificationID: value,
      notifications: updatedNotification
    })
  }

  const handleClick = (id: string) => {
    setValue(id)
  }

  const { data } = useGetPatientQuery(patientID)
  const { data: notificationCategoryData } = useGetAllNotificationsQuery()

  const { data: notificationData } = useGetAllNotificationTypesQuery()
  console.log(userNotificationData, 'dtx')

  return (
    <div className="mt-12 p-4 flex flex-col space-y-4">
      <p>Notifications</p>
      {value}
      <div className="flex flex-row w-full space-x-4">
        <div className="flex flex-col space-y-4 w-1/2">
          {notificationCategoryData?.map((item: NotificationProps) => (
            <div
              key={item.id}
              className="border border-slate-200 p-2
        rounded-lg flex flex-col space-y-2
        "
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

        <CaseManagerDialog label="new">
          <NotifyCard
            label={'SMS'}
            text="SMS Desc"
            isChecked={notificationState.sms}
            handleChecked={() => handleNotificationToggle('sms')}
          />

          <NotifyCard
            label={'WHATSAPP'}
            text="WHATSAPP Desc"
            isChecked={notificationState.whatsapp}
            handleChecked={() => handleNotificationToggle('whatsapp')}
          />
          <NotifyCard
            label={'PUSH NOTIFICATION'}
            text="PUSH NOTIFICATION Desc"
            isChecked={notificationState.push}
            handleChecked={() => handleNotificationToggle('push')}
          />
        </CaseManagerDialog>
      </div>
    </div>
  )
}

export default Settings
