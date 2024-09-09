/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import React, { useCallback } from 'react'
import { PolarAngleAxis, Radar, RadarChart, PolarGrid } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  // ChartLegend,
  // ChartLegendContent,
  ChartTooltip,
  // ChartStyle,
  ChartTooltipContent
} from '@/components/ui/chart'
import { type HomVisitConfigInputProps } from '@/api/homevisit/homeVisitConfig.api'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type CountMap = Record<string, number>

const HomeVisitTypeChart = ({ data }: { data: HomVisitConfigInputProps[] }) => {
  const countMap = useCallback(() => {
    const tempData = data ? [...data] : []

    const filteredData = tempData.map((item) => {
      return { homeVisitReasonDescription: item.HomeVisitReason?.homeVisitReasonDescription }
    })

    return filteredData?.reduce<CountMap>((acc, curr) => {
      const { homeVisitReasonDescription } = curr
      if (acc[homeVisitReasonDescription] !== undefined) {
        acc[homeVisitReasonDescription]++
      } else {
        acc[homeVisitReasonDescription] = 1
      }
      return acc
    }, {})
  }, [data])()

  const chartDatam = Object.keys(countMap).map(
    (homeVisitReasonDescription) => ({
      homeVisitReasonDescription,
      count: countMap[homeVisitReasonDescription]
    })
  )

  return (
    <div className="bg-white p-2 rounded-lg w-1/4">
      <div className="ml-2 mt-2 max-h-full ">
        <h3 className="text-slate-700 font-semibold">Home Visit Reason</h3>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[350px] w-full bg-white rounded-lg"
      >
        {chartDatam && (
          <RadarChart data={chartDatam} cx="50%" cy={'50%'} outerRadius={'80%'}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey={'homeVisitReasonDescription'}
              tickFormatter={(value) => `${value.slice(0, 20)}...`}
            />
            <PolarGrid className="fill-[--color-desktop] opacity-20 " />
            <Radar
              dataKey={'count'}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1
              }}
            />
          </RadarChart>
        )}
      </ChartContainer>
    </div>
  )
}

export default HomeVisitTypeChart
