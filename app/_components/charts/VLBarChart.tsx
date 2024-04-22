/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/prop-types */
import { Chart, type ChartDataset, registerables } from 'chart.js'

// import { type MomentInput } from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'
import CustomSelect from '../forms/CustomSelect'

// interface Props {
//   data: BarChartProps
// }

export interface BarChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'bar', Array<number | [number, number] | null>>>
}

Chart.register(...registerables)

const VLBarChart = () => {
  const { data: vlData } = useGetAllViralLoadTestsQuery()
  const [data, setData] = useState([])
  const [value, setValue] = useState<any>(0)

  //
  useEffect(() => {
    if (vlData) {
      setData(vlData)
    }
  }, [vlData])

  const countTrue = data?.filter((item: any) => item.isVLValid === true).length
  const countFalse = data?.filter((item: any) => item.isVLValid === false).length

  const uniqueYears = useMemo(() => {
    const years: number[] = []

    for (let i = 0; i < vlData.length; i++) {
      const year = new Date(vlData[i].dateOfVL).getFullYear()

      // Check if the year is already in the years array
      if (!years.includes(year)) {
        years.push(year) // Add unique year to the array
      }
    }

    return years
  }, [vlData])

  uniqueYears.sort((a, b) => a - b)

  const yearsOption = useCallback(() => {
    return uniqueYears?.map(item => (
      {
        id: String(item), label: String(item)
      }
    ))
  }, [uniqueYears])

  const chartData = {
    labels: ['True', 'False'],
    datasets: [
      {
        label: 'Is VL Valid?',
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        data: [countTrue, countFalse]
      }
    ]
  }

  console.log(yearsOption(), 'years')

  const handleChange = (val: number) => {
    setData(vlData)
    const filteredData = vlData?.filter((item: any) =>
      new Date(item.dateOfVL).getFullYear() === val
    )
    setData(filteredData)
    setValue(val)
  }

  return (
    <div className="h-[400px] w-[600px] border rounded-lg">
      <div className="p-4 flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg">Viral Load Validity</h1>
        <div className="w-[100px]">
          <CustomSelect
            placeholder="Years"
            data={yearsOption() || []}
            value={value}
            onChange={val => { handleChange(val) }}
          />
        </div>
      </div>
      <div className="pb-10 pl-5 pr-5 w-full h-full">
        <Bar
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

export default VLBarChart
