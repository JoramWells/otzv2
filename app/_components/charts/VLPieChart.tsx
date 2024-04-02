/* eslint-disable react/prop-types */
import { useGetAllVlCategoriesQuery } from '@/api/enrollment/viralLoadTests.api'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { type Point, type ChartDataset, type BubbleDataPoint } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

// export interface PieChartProps {
//   labels: string[]
//   datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
// }

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

const VLPieChart = () => {
  const { data } = useGetAllVlCategoriesQuery()

  console.log(data, 'ty')

  const chartData = {
    labels: data?.map((item: any) => item.category),
    datasets: [
      {
        data: data?.map((item: any) => item.count),
        backgroundColor: ['#36a2eb', '#4caf50', '#ffce56', '#ff6384'],
        hoverBackgroundColor: ['#36a2eb', '#4caf50', '#ffce56', '#ff6384']
      }
    ]
  }

  return (
    <div className="border rounded-lg h-[400px] w-[600px] ">
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
          data={chartData}
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

export default VLPieChart
