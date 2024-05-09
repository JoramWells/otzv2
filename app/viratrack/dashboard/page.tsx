/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const VLBarChart = dynamic(
  async () => await import('../../_components/charts/VLBarChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-[600px] rounded-lg" />
  }
)

const VLPieChart = dynamic(
  async () => await import('../../_components/charts/VLPieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-[600px] rounded-lg" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
  }
]

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

const NotifyPage = () => {
  const router = useRouter()

  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex flex-row justify-between items-center bg-white p-4 mt-4">
        <div>
          <p className="text-xl font-bold">Welcome to ViraTrack</p>
          <p>Scheduled the following appointments</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
          onClick={() => {
            router.push('/patients/add-patients')
          }}
        >
          <PlusCircle size={18} className="mr-2" />
          New Patient
        </Button>
      </div>
      <div className="flex w-full justify-between flex-wrap p-4">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="border-slate-200 rounded-lg p-4 bg-white
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
      <div className=" p-4 bg-white">
        <h1
          className="font-semibold text-xl
        capitalize
        "
        >
          Analytics Appointments
        </h1>
        <div className="flex flex-row space-x-4 mt-2">
          <VLBarChart />
          <VLPieChart />
        </div>
      </div>
    </div>
  )
}

export default NotifyPage
