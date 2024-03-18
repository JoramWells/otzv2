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

const BarChart = ({ data }: Props) => {
  return (
    <div className="w-[400px] h-[400px] p-2
    border rounded-lg
    ">
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Patient Data'
            }
          }
        }}
      />
    </div>
  )
}

export default BarChart
