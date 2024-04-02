/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'
import { Chart, registerables } from 'chart.js'

import { useGetAllWeeklyAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { Button } from '@/components/ui/button'
import { Divider } from '@chakra-ui/react'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BarChart, { type BarChartProps } from '../_components/charts/BarChart'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

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

const chartData: DataPops[] = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
]

Chart.register(...registerables)

const NotifyPage = () => {
  const router = useRouter()

  const { data: weeklyData } = useGetAllWeeklyAppointmentsQuery()
  console.log(weeklyData, 'wered')

  const [barCharData, setBarChartData] = useState<BarChartProps>({
    labels: chartData.map((item: DataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: chartData.map((item) => item.userGain)
      }
    ]
  })

  const transformDataToCart = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tursday', 'Friday', 'Sartuday']
    const appointmentsCountByDay = [0, 0, 0, 0, 0, 0, 0]

    weeklyData.forEach(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate)
      const dayOfWeek = appointmentDate.getDay()
      appointmentsCountByDay[dayOfWeek]++
    })

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Appointments',
          data: appointmentsCountByDay
        }
      ]
    }
  }

  const cartdata = transformDataToCart()

  const cartOptions = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Day of the Week'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Appointments'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

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
      <Divider />
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

      <div
      className='flex flex-row w-full justify-between
      space-x-4
      '
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
      </div>

<Bar data={cartdata} options={cartOptions} />

    </div>
  )
}

export default NotifyPage
