/* eslint-disable react/prop-types */
import { useGetAllVlCategoriesQuery } from '@/api/enrollment/viralLoadTests.api'
// import { type Point, type ChartDataset, type BubbleDataPoint } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import CustomSelect from '../forms/CustomSelect'
import { useState } from 'react'

// export interface PieChartProps {
//   labels: string[]
//   datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
// }

const VLPieChart = () => {
  const { data } = useGetAllVlCategoriesQuery()

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

  const [value, setValue] = useState<any>(0)

  return (
    <div className="border rounded-lg h-[400px] w-[600px] ">
      <div
        className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      "
      >
        <h1 className="font-bold text-lg">VL Summary</h1>
        <div
        className='w-[100px]'
        >
          <CustomSelect
            placeholder="Years"
            data={[
              {
                id: '2019',
                label: '2019'
              }
            ]}
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="w-full h-full pb-12">
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
