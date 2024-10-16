/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import WeeklyAppointmentBarChart from '../../_components/charts/WeeklyAppointmentBarChart'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

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

interface DataPops {
  id: number
  year: number
  userGain: number
  userLost: number
}

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: ''
  }
]

const NotifyPage = () => {
  const router = useRouter()

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-4 bg-white mt-2">
        <h1 className="font-semibold text-lg">Welcome to notify!!</h1>
        <p className="text-slate-500">
          Manage Sent Notifications to client with ease.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg p-5 bg-white
             h-[130px] flex flex-col flex-1 hover:cursor-pointer hover:shadow-none
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
      <div className="p-4 w-full">
        <div className=" bg-white p-4 ">
          <h1
            className="font-semibold text-lg capitalize
        "
          >
            Group Appointments
          </h1>

          <p className="text-[14px] text-slate-500 ">
            Scheduled the following appointments
          </p>
          <div className="flex justify-between space-x-4 bg-white p-4">
            {/* <WeeklyAppointmentBarChart /> */}

          </div>
        </div>
      </div>

    </>
  )
}

export default NotifyPage
