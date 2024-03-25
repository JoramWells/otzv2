/* eslint-disable react/prop-types */
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Point, type ChartDataset, type BubbleDataPoint } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

interface Props {
  data: PieChartProps
}

export interface PieChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
}

const SelectYears = () => (
  <Select>
    <SelectTrigger className="w-[100px]">
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
    <div className="border rounded-lg h-[320px]">
      <div className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      ">
          <h1 className="font-bold text-lg">Modules</h1>
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
