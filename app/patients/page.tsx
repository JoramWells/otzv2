/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Divider } from '@chakra-ui/react'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import WeeklyAppointmentBarChart from '../_components/charts/WeeklyAppointmentBarChart'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import PieChart from '../_components/charts/PieChart'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import LineChart from '../_components/charts/LineChart'

const dataList = [
  {
    id: '1',
    label: 'Registered Patients',
    count: 50,
    link: '/patients/registered-patients'
  },
  {
    id: '2',
    label: 'Deceased',
    count: 20,
    link: ''
  },
  {
    id: '3',
    label: 'Caregivers',
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
  const { data } = useGetAllPatientsQuery()
  console.log(data, 'fr')
  const router = useRouter()

  const ageRanges: Array<[number, number]> = [
    [0, 9],
    [10, 19],
    [20, 24],
    [25, Infinity]
  ]

  const pieChartData = {
    labels: ['Paediatric', 'OTZ', 'OTZ Plus', 'Adult'],
    datasets: [
      {
        data: calculateAgeRange(data || [], ageRanges),
        backgroundColor: ['#d197a4', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  }
  const uniqueDates = Array.from(new Set(data?.map((entry: any) => entry.dateConfirmedPositive)))
  uniqueDates.sort()

  // Assuming uniqueDates is an array of unique dates
  const uniqueYears = [...new Set(uniqueDates.map(date => new Date(date).getFullYear()))]

  // Count the number of patients for each year
  const patientsCountPerYear = uniqueYears.map(year => {
    return data?.filter((item: any) => new Date(item.dateConfirmedPositive).getFullYear() === year).length
  })

  const barCartData = {
    labels: uniqueYears,
    datasets: [{ data: patientsCountPerYear }]
  }

  return (
    <div className="w-full mt-12 p-5 flex-col flex space-y-6">
      <div className="">
        <h1 className="font-bold text-2xl">Patient Management</h1>
        <p className="text-slate-500">Manage registered patients.</p>
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
          Dashboard Analytics
        </h1>

        <p>Scheduled the following appointments</p>
      </div>
      <LineChart data={barCartData} />
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
        <WeeklyAppointmentBarChart />
        <PieChart data={pieChartData} />
      </div>
    </div>
  )
}

export default NotifyPage
