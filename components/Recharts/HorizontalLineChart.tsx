import React, { useCallback, useMemo } from 'react'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { type ARTPrescriptionInterface } from 'otz-types'
import { Skeleton } from '../ui/skeleton'

// const chartConfig = {
//   count: {
//     label: 'Count'
//   },
//   first: {
//     label: 'First',
//     color: 'hsl(var(--chart-1))'
//   },
//   second: {
//     label: 'Second',
//     color: 'hsl(var(--chart-2))'
//   },
//   third: {
//     label: 'Third',
//     color: 'hsl(var(--chart-3))'
//   }
// } satisfies ChartConfig

const colorSet = [1, 2, 3, 4, 5]
let colorIndex = 0

const getNextColor = () => {
  const nextColor = colorSet[colorIndex % colorSet.length]
  colorIndex++
  return `hsl(var(--chart-${nextColor}))`;
}

const HorizontalLineChart = ({ data, isLoading, label, dataKey }: { data: ARTPrescriptionInterface[], isLoading: boolean,
  label: keyof ARTPrescriptionInterface, dataKey: string
 }) => {
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      count:{
        label:'Count'
      }
     }
    data?.forEach(item => {
      const labelDescription = item[label] as string
          const formattedLine = labelDescription?.split(" ")[0];
      if (!config[formattedLine]) {
        config[formattedLine] = {
          label: formattedLine,
          color:getNextColor()
        }
      }
    })
    return config
  }, [data, label])


  const tempData = useMemo(() => {
    return data?.length > 0 ? [...data] : []
  }, [data])

  const fData = useCallback(() => {
    return tempData.filter(item => item[label] !== null) satisfies ARTPrescriptionInterface[] & {count?: number}
  }, [tempData])()

  const transformData = () => fData?.reduce((acc: any[], { line, count }: { line: string, count?: number | string }) => {
    const formattedLine = line.split(' ')[0]
    const colorVar = `var(--color-${line?.split(' ')[0]})`

    // const existingEntry = acc.find(item => item.line === formattedLine)
    // if (existingEntry != null) {
    //   existingEntry.count += 1
    // } else {
      acc.push({
        line: formattedLine,
        count: count,
        fill: colorVar
      })
    // }
    // console.log(!Object.values(acc).some((value) => Number.isNaN(value)))
    return acc
  }, [])
  if (isLoading) {
    return <Skeleton className='max-h-[350px] flex-1 rounded-lg'/>
  }
  return (
      <div className="w-full flex-1 p-2 rounded-lg border-slate-100 bg-white ">
        <div className="ml-1 ">
          <h3 className="font-semibold text-slate-700">Regimen Line Count</h3>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] w-full bg-white rounded-lg"
        >
          <BarChart
            accessibilityLayer
            data={transformData()}
            layout="vertical"
            margin={{
              left: 0
            }}
          >
            <YAxis
              dataKey={label}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: number) =>
                chartConfig[value]?.label as string
              }
            />

            <XAxis dataKey={dataKey} type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey={dataKey} layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
  )
}

export default HorizontalLineChart
