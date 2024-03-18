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

const LineChart = ({ data }: Props) => {
  return (
    <div className="w-[1000px] h-[450px] p-2">
      <Line
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

export default LineChart
