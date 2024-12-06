/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable react/prop-types */
import { Chart, registerables } from 'chart.js'

import { useGetAllVlCategoriesQuery } from '@/api/enrollment/viralLoadTests.api'
// import { type Point, type ChartDataset, type BubbleDataPoint } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import CustomSelect from '../../../components/forms/CustomSelect'
import { useState } from 'react'
import { useUserContext } from '@/context/UserContext'

// export interface PieChartProps {
//   labels: string[]
//   datasets: Array<ChartDataset<'pie', Array<number | Point | [number, number] | BubbleDataPoint | null>>>
// }

//
Chart.register(...registerables)

const VLPieChart = () => {
  const { authUser } = useUserContext()
  const { data } = useGetAllVlCategoriesQuery({
    hospitalID: authUser?.hospitalID as string
  })
  console.log(data, 'datam')

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
    <div className="rounded-lg h-[300px] w-1/4 bg-white">
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
