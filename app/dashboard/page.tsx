/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Chart, registerables } from 'chart.js'
import { useCallback, useState } from 'react'
import PieChart, { type PieChartProps } from '../_components/charts/PieChart'
import BarChart, { type BarChartProps } from '../_components/charts/BarChart'
import LineChart, { type LineChartProps } from '../_components/charts/LineChart'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './art/columns'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAge } from '@/utils/calculateAge'
import { type MomentInput } from 'moment'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import HeaderCategories from '../_components/dashboard/HeaderCategories'

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

interface ItemsProps {
  dob: MomentInput
}

Chart.register(...registerables)

const Dashboard = () => {
  const { data } = useGetAllPatientsQuery()

  //
  const paedData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 0 && age <= 9
    })
    return dtx
  }, [data])

  // otz
  const otzData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 9 && age <= 19
    })
    return dtx
  }, [data])

  // otz plus
  const otzPlusData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 19 && age <= 24
    })
    return dtx
  }, [data])

  // otz plus
  const adultData = useCallback(() => {
    const dtx = data?.filter((item: ItemsProps) => {
      const age = calculateAge(item.dob)
      return age >= 24
    })
    return dtx
  }, [data])

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
  const [barCharData, setBarChartData] = useState<BarChartProps>({
    labels: chartData.map((item: DataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: chartData.map((item) => item.userGain)
      }
    ]
  })

  //
  const [lineChartData, setLineChartData] = useState<LineChartProps>({
    labels: chartData.map((item: DataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: chartData.map((item) => item.userGain)
      }
    ]
  })

  return (
    <div className="p-3 flex flex-col gap-y-4 mt-14">
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
        <HeaderCategories />
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChart data={pieChartData} />

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
