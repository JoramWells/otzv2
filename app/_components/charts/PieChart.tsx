/* eslint-disable react/prop-types */
import { type Point, type ChartDataset, type BubbleDataPoint, registerables, Chart } from 'chart.js'
import { Pie } from 'react-chartjs-2'

interface Props {
  data: PieChartProps
}

Chart.register(...registerables)

export interface PieChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
}

const PieChart = ({ data }: Props) => {
  return (
    <div className=" rounded-lg h-[300px] w-2/5 bg-white p-2 pb-12">
      <div className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      ">
          <h3 className="font-semibold text-slate-700">Status</h3>
      </div>
      <div
      className='w-full h-full'
      >
        <Pie
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

export default PieChart
