/* eslint-disable react/prop-types */
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
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

const SelectYears = () => (
  <Select>
    <SelectTrigger className="w-[100px] shadow-none">
      <SelectValue placeholder="Year" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Years</SelectLabel>
        <SelectItem value="apple">2019</SelectItem>
        <SelectItem value="banana">2020</SelectItem>
        <SelectItem value="blueberry">2021</SelectItem>
        <SelectItem value="grapes">2023</SelectItem>
        <SelectItem value="pineapple">2024</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)

const PieChart = ({ data }: Props) => {
  return (
    <div className=" rounded-lg h-[300px] w-1/4">
      <div className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      ">
          <h1 className="font-bold text-slate-700">CALHIV</h1>
        <SelectYears />
      </div>
      <div
      className='w-full h-full pb-12'
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
