/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[48px] rounded-lg" />
  }
)

//
const LineChart = dynamic(
  async () => await import('../../_components/charts/LineChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px] md:w-3/4  m-0" />
  }
)

const PieChart = dynamic(
  async () => await import('../../_components/charts/PieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px] md:w-1/4  m-0" />
  }
)

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
    link: '/'
  }
]

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
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
    <div className="w-full p-2">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="bg-white p-2 mt-2 rounded-lg">
        <h1 className="font-semibold text-xl text-slate-700 rounded-lg">
          Patient Management Dashboard
        </h1>
      </div>
      <div className="flex w-full justify-between flex-wrap mt-2 mb-2 space-x-2">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl p-4 bg-white
             h-[110px] flex flex-col w-[310px] hover:cursor-pointer hover:shadow-sm
      "
            onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-bold">{item.label}</h1>
              <Users size={18} />
            </div>
            <p className="text-2xl font-bold text-slate-600">{item.count}</p>
            <small className="text-slate-500 text-sm">Since last month</small>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 flex flex-col space-y-2 rounded-lg">
        <h1
          className="font-semibold text-xl mb-2
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
