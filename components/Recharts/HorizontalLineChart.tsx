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

const chartConfig = {
  count: {
    label: 'Count'
  },
  first: {
    label: 'First',
    color: 'hsl(var(--chart-1))'
  },
  second: {
    label: 'Second',
    color: 'hsl(var(--chart-2))'
  },
  third: {
    label: 'Third',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig

const HorizontalLineChart = ({ data, isLoading }: { data: ARTPrescriptionInterface[], isLoading: boolean }) => {
  const tempData = useMemo(() => {
    return data?.length > 0 ? [...data] : []
  }, [data])

  const fData = useCallback(() => {
    return tempData.filter(item => item.line !== null)
  }, [tempData])()

  const transformData = () => fData?.reduce((acc: any[], { line }: { line: string }) => {
    const formattedLine = line.split(' ')[0]
    const colorVar = `var(--color-${line?.split(' ')[0]?.toLowerCase()})`

    const existingEntry = acc.find(item => item.line === formattedLine)
    if (existingEntry != null) {
      existingEntry.count += 1
    } else {
      acc.push({
        line: formattedLine,
        count: 1,
        fill: colorVar
      })
    }
    // console.log(!Object.values(acc).some((value) => Number.isNaN(value)))
    return acc
  }, [])
  console.log(data, 'tdata')
  if (isLoading) {
    return <Skeleton className='max-h-[200px] w-1/4 rounded-lg'/>
  }
  return (
    <div className="w-1/4 max-h-[200px] p-2 ">
      <div
      className='ml-4'
      >
        <h3
        className='font-semibold text-slate-700'
        >Regimen Line Count</h3>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[200px] w-full bg-white rounded-lg"
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
            dataKey={'line'}
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />

          <XAxis dataKey={'count'} type="number" hide />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar dataKey={'count'} layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default HorizontalLineChart
