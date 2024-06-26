/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/prop-types */
import { Chart, type ChartDataset, registerables } from 'chart.js'

// import { type MomentInput } from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'
import CustomSelect from '../../../components/forms/CustomSelect'

// interface Props {
//   data: BarChartProps
// }

export interface BarChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'bar', Array<number | [number, number] | null>>>
}

interface vlDataProps {
  dateOfVL: Date | number | string
}

Chart.register(...registerables)

const VLBarChart = () => {
  const { data: vlData } = useGetAllViralLoadTestsQuery()
  const [data, setData] = useState([])
  const [value, setValue] = useState<number>(0)

  //
  useEffect(() => {
    if (vlData) {
      setData(vlData)
    }
  }, [vlData])

  const countTrue = data?.filter((item: any) => item.isVLValid === true).length
  const countFalse = data?.filter((item: any) => item.isVLValid === false).length

  const uniqueYears: number[] | any = useMemo(() => {
    return [
      ...new Set(
        vlData?.map((item: vlDataProps) => new Date(item.dateOfVL).getFullYear())
      )
    ]
  }, [vlData])

  uniqueYears.sort((a: number, b: number) => a - b)

  const yearsOption = useCallback(() => {
    return uniqueYears?.map((item: any) => (
      {
        id: item, label: item
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
    <div className="h-[300px] w-1/4 bg-slate-50 rounded-lg">
      <div className="p-4 flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg">Viral Load Validity</h1>
        <div className="w-[100px]">
          <CustomSelect
            placeholder="Years"
            data={yearsOption() || []}
            value={value as unknown as string}
            onChange={val => { handleChange(val) }}
          />
        </div>
      </div>
      <div className="pb-16 pl-5 pr-5 w-full h-full">
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
