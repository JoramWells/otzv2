/* eslint-disable react/prop-types */
import { type Point, type ChartDataset } from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

interface Props {
  data: LineChartProps
}

export interface LineChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'line', Array<number | Point | null>>>
}

const cData = {
  labels: ['']
}

const LineChart = ({ data }: Props) => {
  return (
    <div className="h-[400px] md:w-full border rounded-lg p-5">
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Patient Data'
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}

export default LineChart
