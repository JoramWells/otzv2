import { useGetPatientNotificationQuery } from '@/api/notifications/patientNotification.api'
import moment, { type MomentInput } from 'moment'
import React from 'react'

interface ItemProps {
  id: string
  message: string
  medicineTime: MomentInput
  updatedAt: MomentInput
}

const Messages = ({ patientID }: { patientID: string }) => {
  const { data } = useGetPatientNotificationQuery(patientID)
  console.log(data)
  const isSame = (time1: MomentInput, time2: MomentInput) => {
    const sentTime = moment(time1, 'HH:mm:ss')
    const medicineTime = moment(time2, 'HH:mm:ss')
    if (sentTime.isSame(medicineTime)) {
      return true
    }
    return false
  }
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {data?.map((item: ItemProps) => (
        <div
          key={item.id}
          className="border border-slate-200 w-1/2 p-4 rounded-lg"
        >
          {item.message}
          {isSame(item.medicineTime, moment(item.updatedAt, 'HH:mm:ss'))
            ? 'same'
            : 'not same'}
          <div>
            <p>Date: {moment(item.updatedAt).format('ll')} </p>
            <p>Medicine Time: {item.medicineTime}</p>
            <p>Sent Time: {moment(item.updatedAt, 'HH:mm:ss').format('HH:mm a')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Messages
