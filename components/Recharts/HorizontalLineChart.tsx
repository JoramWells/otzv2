/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo } from 'react'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
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

export interface HorizontalLineChartParams {
  line: string
  count: number
  label?: string
}

const getNextColor = () => {
  const nextColor = colorSet[colorIndex % colorSet.length]
  colorIndex++
  return 'hsl(var(--chart-4))'
}

interface HorizontalLineChartInputProps {
  data: HorizontalLineChartParams[]
  isLoading?: boolean
  label: keyof HorizontalLineChartParams
  dataKey: string
  title: string
}

const HorizontalLineChart = ({ data, isLoading, label, dataKey, title }: HorizontalLineChartInputProps) => {
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      // count: {
      //   label: 'Count'
      // }
    }
    data?.forEach(item => {
      const formattedLine = typeof item[label] === 'string' ? item[label]?.split(' ')[0] : ''
      // if (formattedLine?.toLowerCase() != null) {
      config[formattedLine?.toLowerCase()] = {
        label: formattedLine,
        color: getNextColor()
      }
      // }
    })
    return config
  }, [data, label])

  const tempData = useMemo(() => {
    return data?.length > 0 ? [...data] : []
  }, [data])

  const fData = useCallback(() => {
    return tempData.filter(item => item[label] !== null)
  }, [label, tempData])()

  const transformData = () => fData?.reduce((acc: any[], { line, count }) => {
    const formattedLine = line.split(' ')[0]?.toLowerCase()
    const colorVar = `var(--color-${formattedLine})`

    // const existingEntry = acc.find(item => item.line === formattedLine)
    // if (existingEntry != null) {
    //   existingEntry.count += 1
    // } else {
    acc.push({
      line: formattedLine,
      count,
      fill: colorVar
    })
    // }
    // console.log(!Object .values(acc).some((value) => Number.isNaN(value)))
    return acc
  }, [])

  if (isLoading ?? false) {
    return <Skeleton className='max-h-[200px] flex-1 rounded-lg'/>
  }
  return (
    <div className="flex-1 rounded-lg ring ring-slate-100  border-slate-200 border bg-white ">
      <div className="p-2 bg-slate-50 rounded-t-lg border-b border-slate-100 ">
        <h3 className="font-semibold text-[14px]">{title}</h3>
      </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[200px] ml-2 flex-1 w-full rounded-lg"
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
              tickFormatter={(value: string) =>
                value.slice(0, 3)
              }
              hide
            />

            <XAxis dataKey={dataKey} type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar dataKey={dataKey} layout="vertical" radius={5} height={200}>
              <LabelList
                dataKey={label}
                position="insideLeft"
                offset={8}
                className={'fill-[--color-label]'}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
    </div>
  )
}

export default HorizontalLineChart
