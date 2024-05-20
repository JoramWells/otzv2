/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { type UserDashboardCardDataListProps } from '@/app/_components/UserDasboard'

const UserDashboardCard = dynamic(
  async () => await import('@/app/_components/UserDasboard'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[110px] rounded-lg flex-1 p-4" />
  }
)

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

//
const LineChart = dynamic(
  async () => await import('../../_components/charts/LineChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] md:w-3/4" />
  }
)

const PieChart = dynamic(
  async () => await import('../../_components/charts/PieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] md:w-1/4" />
  }
)

const NotifyPage = () => {
  const { data } = useGetAllPatientsQuery()

  // const dataList: UserDashboardCardDataListProps[] =

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

  const dlMemoized: UserDashboardCardDataListProps[] = useMemo(() => [
    {
      id: '1',
      label: 'Registered Patients',
      count: data?.length,
      link: '/patients/registered-patients'
    },
    {
      id: '2',
      label: 'Mortality',
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
  ], [data])

  const ageRanges: Array<[number, number]> = [
    [0, 9],
    [10, 19],
    [20, 24],
    [25, Infinity]
  ]

  const pieChartData = {
    labels: ['PAMA', 'OTZ', 'OTZ +', 'Adult'],
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
    <div className="w-full">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex w-full justify-between flex-wrap space-x-4 p-2">
        {dlMemoized.map((item, idx) => (
          <UserDashboardCard key={idx} item={item} />
        ))}
      </div>
      <div className="bg-white p-4 flex flex-col space-y-2 rounded-lg">
        <h1 className=" text-lg ">Patient Management</h1>
        <p
          className="font-semibold capitalize
        "
        >
          Dashboard Analytics
        </p>

        {/*  */}

        {/*  */}
        <div className="flex justify-between space-x-4 ">
          <LineChart data={barCartData} />

          <PieChart data={pieChartData} />
        </div>
      </div>
    </div>
  )
}

export default NotifyPage
