/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Chart, registerables } from 'chart.js'
import { useState } from 'react'
import PieChart, { type PieChartProps } from '../_components/charts/PieChart'
import BarChart, { type BarChartProps } from '../_components/charts/BarChart'
import LineChart, { type LineChartProps } from '../_components/charts/LineChart'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './art/columns'

interface dataPops {
  id: number
  year: number
  userGain: number
  userLost: number
}

export const data: dataPops[] = [
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
  const [pieChartData, setChartData] = useState<PieChartProps>({
    labels: data.map((item: dataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: data.map((item) => item.userGain)
      }
    ]
  })

  //
  const [barCharData, setBarChartData] = useState<BarChartProps>({
    labels: data.map((item: dataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: data.map((item) => item.userGain)
      }
    ]
  })

  //
  const [lineChartData, setLineChartData] = useState<LineChartProps>({
    labels: data.map((item: dataPops) => item.year.toString()),
    datasets: [
      {
        label: 'Users Gained',
        data: data.map((item) => item.userGain)
      }
    ]
  })

  return (
    <div className="ml-64 pt-12 p-3">
      <div
        className="grid grid-cols-6
      "
      >
        <div
          className="flex flex-row
        gap-x-4
        "
        >
          <PieChart data={pieChartData} />
          <BarChart data={barCharData} />
        </div>
        <div
          className="w-[500px] border
        p-2
        "
        >
          <p className="text-xl font-bold mb-4 rounded-lg">
            Upcoming Appointments
          </p>
          <CustomTable isSearch={false} columns={columns} data={[]} />
        </div>
      </div>
      <LineChart data={lineChartData} />
    </div>
  )
}

export default Dashboard
