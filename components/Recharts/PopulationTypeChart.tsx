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
import { type PatientAttributes } from 'otz-types'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type CountMap = Record<string, number>

const PopulationTypeChart = ({ data }: { data: PatientAttributes[] }) => {
  const countMap = useCallback(() => {
    const tempData = data ? [...data] : []

    const filteredData = tempData.filter(item => {
      return item.populationType
    })

    const cleanedData = filteredData.map(item => ({
      populationType: item?.populationType?.replace(/\r\n/g, '') ?? ''
    }))

    const kpData = cleanedData.filter(item => {
      return item.populationType.length > 0
    })

    return kpData?.reduce<CountMap>((acc, curr) => {
      const { populationType } = curr
      if (acc[populationType] !== undefined) {
        acc[populationType]++
      } else {
        acc[populationType] = 1
      }
      return acc
    }, {})
  }, [data])()

  const chartDatam = Object.keys(countMap).map(populationType => ({
    populationType,
    count: countMap[populationType]
  }))

  return (
    <div className='bg-white rounded-lg w-1/3'>
      <div className="ml-4 mt-2 max-h-full ">
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
              dataKey={'populationType'}
              tickFormatter={(value) => `${value.slice(0, 10)}...`}
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

export default PopulationTypeChart
