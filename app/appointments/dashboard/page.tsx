/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import WeeklyAppointmentBarChart from '../../_components/charts/WeeklyAppointmentBarChart'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import AppointmentPieChart from '@/app/_components/charts/AppointmentPieChart'
import { useGetAllAppointmentsQuery, useGetAllPriorityAppointmentsQuery } from '@/api/appointment/appointment.api.'
import Avatar from '@/components/Avatar'
import { AppointmentBarChart } from '@/components/Recharts/AppointmentBarChart'
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
    count: 50
    // link: '/notify/appointment'
  },
  {
    id: '2',
    label: 'Refill Appointments',
    count: 20
    // link: ''
  },
  {
    id: '3',
    label: 'Viral Load',
    count: 13
    // link: ''
  },
  {
    id: '4',
    label: 'Recent Appointments',
    count: 7
    // link: ''
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
    link: '/'
  }
]

const NotifyPage = () => {
  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: '2022-01-01',
    mode: 'weekly'
  })

  const { data: priorityAppointmentData } = useGetAllPriorityAppointmentsQuery()

  const router = useRouter()

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4  md:grid-cols-2">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4 bg-white
             h-[130px] flex flex-col  hover:cursor-pointer hover:shadow-none
      "
            // onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h3 className="">{item.label}</h3>
              <Users size={15} />
            </div>
            <p className="text-xl font-bold">{item.count}</p>
            <p className="text-slate-500 text-[12px]">Since last month</p>
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
            <AppointmentBarChart />

            <AppointmentPieChart data={weeklyData} />
            <div className="flex-1 bg-white rounded-lg flex flex-col p-4 border border-slate-200">
              <p className="font-bold pl-2">Upcoming Appointments</p>
              {priorityAppointmentData?.map((item: AppointmentProps) => (
                <div
                  className="flex items-center space-x-4 w-full hover:cursor-pointer hover:bg-slate-50 p-1 rounded-lg mt-2"
                  key={item.id}
                >
                  <Avatar
                    name={`${item.Patient?.firstName} ${item.Patient?.middleName}`}
                  />
                  <p className="text-[14px] text-slate-500 ">
                    {item.Patient?.firstName} {item.Patient?.middleName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </div>
  )
}

export default NotifyPage
