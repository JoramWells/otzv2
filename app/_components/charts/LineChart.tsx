/* eslint-disable react/prop-types */
import { Skeleton } from '@/components/ui/skeleton'
import { type Point, type ChartDataset } from 'chart.js'
import React, { Suspense } from 'react'
import { Line } from 'react-chartjs-2'

interface Props {
  data: LineChartProps
}

export interface LineChartProps {
  labels: number[]
  datasets: Array<ChartDataset<'line', Array<number | Point | null>>>
}

const LineChart = ({ data }: Props) => {
  return (
    <Suspense fallback={<Skeleton className="h-[400px] md:w-full" />}>
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
    </Suspense>
  )
}

export default LineChart
