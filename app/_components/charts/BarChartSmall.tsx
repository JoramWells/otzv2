/* eslint-disable react/prop-types */
import { type ChartDataset } from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

interface Props {
  data: BarChartProps
}

export interface BarChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'bar', Array<number | [number, number] | null>>>
}

const BarChartSmall = ({ data }: Props) => {
  return (
    <div className="h-[320px] md:w-full border rounded-lg">
      <h1 className="font-bold text-lg">Enrollment</h1>
      <div
      className='pb-10 pl-5 pr-5 w-full h-full'
      >
        <Bar
          data={data}
          options={{
            plugins: {
              // title: {
              //   display: true,
              //   text: 'Patient Data'
              // }
            },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  )
}

export default BarChartSmall
