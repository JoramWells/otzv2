/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { type ARTPrescriptionInterface } from 'otz-types'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type CountMap = Record<string, number>

const RadarARTChart = ({ data }: { data: ARTPrescriptionInterface[] }) => {
  const countMap = useCallback(() => {
    const tempData = data ? [...data] : []

    const filteredData = tempData.filter((item) => {
      return item.regimen
    })

    // const cleanedData = filteredData.map((item) => ({
    //   regimen: item?.regimen?.replace(/\r\n/g, '') ?? ''
    // }))

    // const kpData = cleanedData.filter((item) => {
    //   return item.regimen !== 'General Population'
    // })

    return filteredData?.reduce<CountMap>((acc, curr) => {
      const { regimen } = curr
      if (acc[regimen] !== undefined) {
        acc[regimen]++
      } else {
        acc[regimen] = 1
      }
      return acc
    }, {})
  }, [data])()

  const chartDatam = Object.keys(countMap).map((regimen) => ({
    regimen,
    count: countMap[regimen]
  }))

  return (
    <div className="bg-white p-2 rounded-lg flex-1 border-slate-100 ">
      <div className="ml-1 max-h-full ">
        <h3 className="text-slate-700 font-semibold">Key Population</h3>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[250px] w-full bg-white rounded-lg"
      >
        {chartDatam && (
          <RadarChart data={chartDatam} cx="50%" cy={'50%'} outerRadius={'80%'}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey={'regimen'}
              tickFormatter={(value) => `${value.slice(0, 15)}...`}
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

export default RadarARTChart
