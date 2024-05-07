/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import PieChart from '../../_components/charts/PieChart'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import LineChart from '../../_components/charts/LineChart'
import { useMemo } from 'react'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'

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

const NotifyPage = () => {
  const { data } = useGetAllPatientsQuery()
  const router = useRouter()

  const ageRanges: Array<[number, number]> = [
    [0, 9],
    [10, 19],
    [20, 24],
    [25, Infinity]
  ]

  const pieChartData = {
    labels: ['Pediatric', 'OTZ', 'OTZ Plus', 'Adult'],
    datasets: [
      {
        data: calculateAgeRange(data || [], ageRanges),
        backgroundColor: ['#d197a4', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  }

  const uniqueYears: number[] | any = useMemo(() => {
    return [
      ...new Set(
        data?.map((item: any) =>
          new Date(item.dateConfirmedPositive).getFullYear()
        )
      )
    ]
  }, [data])

  uniqueYears.sort((a: number, b: number) => a - b)

  // Count the number of patients for each year
  const patientsCountPerYear = uniqueYears.map((year: any) => {
    return data?.filter((item: any) => new Date(item.dateConfirmedPositive).getFullYear() === year).length
  })

  const barCartData = {
    labels: uniqueYears,
    datasets: [{ data: patientsCountPerYear }]
  }

  return (
    <div className="w-full flex-col flex space-y-2">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="bg-white p-4">
        <h1 className="font-bold text-2xl text-slate-700">
          Patient Management Dashboard
        </h1>
      </div>
      <div className="flex w-full justify-between flex-wrap p-4">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl p-5 bg-white
             h-[110px] flex flex-col w-[350px] hover:cursor-pointer hover:shadow-sm
      "
            onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold">{item.label}</h1>
              <Users size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-600">{item.count}</p>
            <small className="text-slate-500 text-sm">Since last month</small>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 flex flex-col space-y-2">
        <h1
          className="font-semibold text-xl
        capitalize
        "
        >
          Dashboard Analytics
        </h1>

        {/*  */}

        {/*  */}
        <div className="flex justify-between space-x-4 pr-2">
          <LineChart data={barCartData} />

          <PieChart data={pieChartData} />
        </div>
      </div>
    </div>
  )
}

export default NotifyPage
