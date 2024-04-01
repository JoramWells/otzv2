/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Divider } from '@chakra-ui/react'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

const dataList = [
  {
    id: '1',
    label: 'Todays Appointment',
    count: 50,
    link: '/notify/appointment'
  },
  {
    id: '2',
    label: 'Scheduled SMS & Whatsapp',
    count: 20,
    link: ''
  },
  {
    id: '3',
    label: 'Scheduled Voice Calls',
    count: 13,
    link: ''
  },
  {
    id: '4',
    label: 'App Notification',
    count: 7,
    link: ''
  }
]

const NotifyPage = () => {
  const router = useRouter()
  return (
    <div className="w-full mt-12 p-5 flex-col flex space-y-6">
      <div className="">
        <h1 className="font-semibold text-2xl">Welcome to notify!!</h1>
        <p className="text-slate-500">
          Manage Sent Notifications to client with ease.
        </p>
      </div>
      <div className="flex w-full justify-between flex-wrap">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-lg p-5
             h-[130px] flex flex-col w-[350px] hover:cursor-pointer hover:shadow-sm
      "
            onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold text-lg">{item.label}</h1>
              <Users size={20} />
            </div>
            <p className="text-2xl font-bold">{item.count}</p>
            <p className="text-slate-500 text-sm">Since last month</p>
          </div>
        ))}
      </div>
      <Divider/>
      <div
      className=''
      >
        <h1 className="font-semibold text-2xl
        capitalize
        ">group Appointments</h1>

        <p>Scheduled the following appointments</p>
      </div>
    </div>
  )
}

export default NotifyPage
