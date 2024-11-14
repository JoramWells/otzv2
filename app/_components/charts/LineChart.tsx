/* eslint-disable react/prop-types */

import { Skeleton } from '@/components/ui/skeleton'
import { type Point, type ChartDataset, registerables, Chart } from 'chart.js'
import { Suspense } from 'react'
import { Line } from 'react-chartjs-2'

interface Props {
  data: LineChartProps
}

export interface LineChartProps {
  labels: number[]
  datasets: Array<ChartDataset<'line', Array<number | Point | null>>>
}

Chart.register(...registerables)

const LineChart = ({ data }: Props) => {
  return (
    <Suspense fallback={<Skeleton className="h-[300px] md:w-3/4" />}>
      <div className="h-[300px] flex-1 p-4 bg-slate-50 rounded-lg">
        <h1 className="font-bold text-slate-700">Registration Trend</h1>

        <Line
          data={data}
          options={{
            // plugins: {
            //   title: {
            //     display: true,
            //     text: 'Patient Data'
            //   }
            // },
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </Suspense>
  )
}

export default LineChart
