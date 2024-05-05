/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import WeeklyAppointmentBarChart from '../../_components/charts/WeeklyAppointmentBarChart'
import { useGetAllTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPillDailyUptakeCountQuery } from '@/api/treatmentplan/uptake.api'
import DoubleARTUptakeBarChart from '../../_components/charts/DoubleARTUptakeBarChart'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'

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

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: ''
  },
  {
    id: '2',
    label: 'dashboard',
    link: 'dashboard'
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

  const { data } = useGetAllTimeAndWorkQuery(
    {
      medicationsDue: true
    }
  )

  const { data: uptakeCount } = useGetPillDailyUptakeCountQuery({
    patientsDueMorning: true
  })
  console.log(uptakeCount, 'kl')

  return (
    <div className="w-full p-4 flex-col flex space-y-6">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="">
        <h1 className="font-semibold text-2xl">Welcome to Pillbox!!</h1>
        <p className="text-slate-500">
          Manage Patient Prescriptions and reminders.
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
      <div className='border-b border-slate-200 w-full'/>
      <div className="">
        <h1
          className="font-semibold text-2xl
        capitalize
        "
        >
          group Appointments
        </h1>

        <p>Scheduled the following appointments</p>
      </div>

      {/* <div
        className="flex flex-row w-full justify-between
      space-x-4
      "
      >
        {['high vl', 'lu'].map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-100 rounded-lg p-4
        border-l-8 border-l-teal-600 flex-1
        "
          >
            <h1
              className="capitalize text-lg
          font-semibold
          "
            >
              Support group
            </h1>
            <h1
              className="capitalize
            text-slate-500
          "
            >
              Book Appointments for patient with high vl
            </h1>
            <p className="mt-2 text-xl font-extrabold">35,567 Patients</p>

            <div className="w-full flex justify-end">
              <Button
                className="bg-teal-600
            shadow-none
            "
              >
                Create Appointment
              </Button>
            </div>
          </div>
        ))}
      </div> */}
      <DoubleARTUptakeBarChart
        morningTrueCount={uptakeCount?.morningTrueCount}
        morningFalseCount={uptakeCount?.morningFalseCount}
        eveningTrueCount={uptakeCount?.eveningTrueCount}
        eveningFalseCount={uptakeCount?.eveningFalseCount}
      />
    </div>
  )
}

export default NotifyPage
