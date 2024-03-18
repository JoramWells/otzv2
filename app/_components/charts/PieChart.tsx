/* eslint-disable react/prop-types */
import { type Point, type ChartDataset, type BubbleDataPoint } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

interface Props {
  data: PieChartProps
}

export interface PieChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
}

const PieChart = ({ data }: Props) => {
  return (
    <div className="w-[400px] h-[400px] p-2 border rounded-lg">
      <Pie
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

export default PieChart
