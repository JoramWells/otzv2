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
    <div className="p-2 border rounded-lg">
      <Pie
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

export default PieChart
