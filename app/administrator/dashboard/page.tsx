/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Chart, registerables } from 'chart.js'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Users } from 'lucide-react'
import { type HeaderCategoriesProps } from '@/app/_components/dashboard/HeaderCategories'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

//
const HeaderCategories = dynamic(
  async () => await import('@/app/_components/dashboard/HeaderCategories'),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[110px] rounded-lg" />
  }
)

//
const PieChart = dynamic(
  async () => await import('@/app/_components/charts/PieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[300px] rounded-lg" />
  }
)

//
const BarChart = dynamic(
  async () => await import('@/app/_components/charts/BarChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[300px] rounded-lg" />
  }
)

//
const LineChart = dynamic(
  async () => await import('@/app/_components/charts/LineChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="flex-1 h-[300px] rounded-lg" />
  }
)

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
        data: calculateAgeRange(data ?? [], ageRanges),
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

  const listItems: HeaderCategoriesProps[] = [
    {
      id: '1',
      title: 'Total Number of Patients',
      icon: <Users size={18} />,
      count: '45, 894',
      description: 'Since last month'
    },
    {
      id: '2',
      title: 'Active Patients',
      icon: <Users size={18} />,
      count: '45, 894',
      description: 'Since last month'
    },
    {
      id: '3',
      title: 'Available drugs',
      icon: <Users size={18} />,
      count: '45, 894',
      description: 'Since last month'
    }
  ]

  return (
    <div className="">
      {/* breadcrumb */}
      <BreadcrumbComponent dataList={dataList} />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 p-4 md:grid-cols-2">
        {listItems.map((item: HeaderCategoriesProps) => (
          <HeaderCategories
            key={item.id}
            id={item.id}
            count={item.count}
            description={item.description}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>

      <div className=" p-4 bg-white rounded-lg">
        <p className="font-bold">Dashboard Analytics</p>

        <div className="flex flex-row justify-between space-x-2 mt-2">
          <PieChart data={pieChartData} />

          <BarChart data={barCharData} />
          <LineChart data={lineChartData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
