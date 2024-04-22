/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Divider } from '@chakra-ui/react'
import { useAddUserNotificationMutation, useUpdateUserNotificationMutation } from '@/api/notifications/userNotification.api'
import { type UserNotificationData } from '@/app/patients/settings/[patientID]/Settins'
interface NotificationProps {
  voice?: boolean
  sms?: boolean
  whatsapp?: boolean
  push?: boolean
}
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
    </>
  )
}

interface AddNotificationDialogProps {
  patientID: string
  notificationID: string
  userNotificationData: UserNotificationData[]
//   notificationID: string;
}

const AddNotificationDialog = ({
  patientID, notificationID,
  userNotificationData

}: AddNotificationDialogProps) => {
  const [notificationState, setNotificationState] = useState<NotificationProps>({
    voice: false,
    sms: false,
    whatsapp: false,
    push: false
  })

  //   const { data: userNotificationData } = useGetUserNotificationQuery(patientID)

  const [addUserNotification] = useAddUserNotificationMutation()

  //
  const handleNotificationToggle = async (key: string) => {
    const notificationType2 = userNotificationData?.filter((item: UserNotificationData) => {
      return item.notificationID === notificationID
    })

    const updatedNotification = {
      ...notificationState
      // [key]: !notificationState[key]
    }
    if (notificationType2.length === 0) {
      await addUserNotification({
        // id: userNotificationData?.id,
        patientID,
        notificationID,
        notifications: updatedNotification
      })
      setNotificationState({
        voice: false,
        sms: false,
        whatsapp: false,
        push: false
      })
    } else {
      await updateUserNotification({
        id: notificationType2[0]?.id,
        patientID,
        notificationID,
        notifications: updatedNotification
      })
      setNotificationState(updatedNotification)
    }
  }

  //   console.log(notificationType, 'list')
  console.log(userNotificationData, 'notificationState')

  const [updateUserNotification] = useUpdateUserNotificationMutation()
  useEffect(() => {
    const notificationType = userNotificationData?.filter((item) => {
      return item.notificationID === notificationID
    })

    // if (notificationType?.length > 0) {
    //   setNotificationState(notificationType[0].notifications)
    // }
    if (notificationType?.length === 0) {
      setNotificationState({
        voice: false,
        sms: false,
        whatsapp: false,
        push: false
      })
    }
  }, [notificationID, userNotificationData])

  return (
    <div
      className="w-1/2 border border-slate-200 rounded-lg p-4
    flex flex-col space-y-4
    "
    >
      <NotifyCard
        label={'SMS'}
        text="SMS Desc"
        isChecked={notificationState?.sms}
        handleChecked={async () => {
          await handleNotificationToggle('sms')
        }}
      />
      <Divider />

      <NotifyCard
        label={'WHATSAPP'}
        text="WHATSAPP Desc"
        isChecked={notificationState?.whatsapp}
        handleChecked={async () => {
          await handleNotificationToggle('whatsapp')
        }}
      />
      <Divider />

      <NotifyCard
        label={'PUSH NOTIFICATION'}
        text="PUSH NOTIFICATION Desc"
        isChecked={notificationState?.push}
        handleChecked={async () => {
          await handleNotificationToggle('push')
        }}
      />
    </div>
  )
}

export default AddNotificationDialog
