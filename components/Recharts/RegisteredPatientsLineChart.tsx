/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useCallback } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { type PatientAttributes } from 'otz-types'

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  F: {
    label: 'Female',
    color: 'hsl(var(--chart-4))'
  },
  M: {
    label: 'Male',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

interface CountMapEntry {
  year: number
  M: number
  F: number
}

type CountMap = Record<number, CountMapEntry>

const RegisteredPatientsLineChart = ({ data }: { data: PatientAttributes[] }) => {
  const prepareData = useCallback(() => {
    const countMap: CountMap = {}

    const filteredData = data?.filter(item => item.sex !== null).map(item => {
      let normalizedSex = item.sex
      if (item.sex === 'MALE') {
        normalizedSex = 'M'
      } else if (item.sex === 'FEMALE') {
        normalizedSex = 'F'
      }

      return { sex: normalizedSex, date: item.dateConfirmedPositive }
    })

    filteredData?.forEach(item => {
      const { date, sex } = item
      const year = new Date(date!).getFullYear()
      if (sex && (sex === 'M' || sex === 'F')) {
        if (!countMap[year]) {
          countMap[year] = { year, M: 0, F: 0 }
        }
        countMap[year][sex]++
      }
    })

    return Object.values(countMap)
  }, [data])()

  return (
    <div className='flex-1' >
      {prepareData?.length > 0 && (
        <ChartContainer
          config={chartConfig}
          className="aspect-auto  h-[300px] w-full bg-white rounded-lg"
        >
          <AreaChart data={prepareData}>
            <defs>
              <linearGradient
                id="fillDesktop"
                x1={'0'}
                y1={'0'}
                x2={'0'}
                y2={'1'}
              >
                <stop
                  offset={'5%'}
                  stopColor="var(--color-F)"
                  stopOpacity={0.8}
                />

                <stop
                  offset={'95%'}
                  stopColor="var(--color-F)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillMobile"
                x1={'0'}
                y1={'0'}
                x2={'0'}
                y2={'1'}
              >
                <stop
                  offset={'5%'}
                  stopColor="var(--color-M)"
                  stopOpacity={0.8}
                />

                <stop
                  offset={'95%'}
                  stopColor="var(--color-M)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey={'M'}
              type={'natural'}
              fill="url(#fillMobile)"
              stroke="var(--color-M)"
              stackId={'a'}
            />

            <Area
              dataKey={'F'}
              type={'natural'}
              fill="url(#fillDesktop"
              stroke="var(--color-F)"
              stackId={'a'}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  )
}

export default RegisteredPatientsLineChart
