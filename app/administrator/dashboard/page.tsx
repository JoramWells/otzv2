/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Chart, registerables } from 'chart.js'
import PieChart from '../../_components/charts/PieChart'
import BarChart from '../../_components/charts/BarChart'
import LineChart from '../../_components/charts/LineChart'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../art/columns'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import HeaderCategories from '../../_components/dashboard/HeaderCategories'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'

interface DataPops {
  id: number
  year: number
  userGain: number
  userLost: number
}

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '1',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

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

const Dashboard = () => {
  const { data } = useGetAllPatientsQuery()

  const ageRanges: Array<[number, number]> = [[0, 9], [10, 19], [20, 24], [25, Infinity]]

  const pieChartData = {
    labels: ['Paediatric', 'OTZ', 'OTZ Plus', 'Adult'],
    datasets: [
      {
        data: calculateAgeRange(data || [], ageRanges),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  }

  //
  const barCharData = {
    labels: chartData.map((item: DataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: chartData.map((item) => item.userGain)
      }
    ]
  }

  //
  const lineChartData = {
    labels: chartData.map((item: DataPops) => item.year),
    datasets: [
      {
        label: 'Users Gained',
        data: chartData.map((item) => item.userGain)
      }
    ]
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* breadcrumb */}
      <BreadcrumbComponent dataList={dataList} />

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
        <HeaderCategories />
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
        <Suspense fallback={<Skeleton className="h-[320px]" />}>
          <PieChart data={pieChartData} />
        </Suspense>

        <BarChart data={barCharData} />
        <div
          className="border
        p-2
        "
        >
          <p className="text-lg font-bold mb-4 rounded-lg">
            Upcoming Appointments
          </p>
          <CustomTable isSearch={false} columns={columns} data={[]} />
        </div>
      </div>
      <div className="grid md:grid-cols-1">
        <LineChart data={lineChartData} />
      </div>
    </div>
  )
}

export default Dashboard
