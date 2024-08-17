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
    const tempData = ((data?.length) !== 0) ? [...data] : []

    const filteredData = tempData.filter(item => {
      return item.populationType
    })

    const cleanedData = filteredData.map(item => ({
      populationType: item?.populationType?.replace(/\r\n/g, '') ?? ''
    }))

    const kpData = cleanedData.filter(item => {
      return item.populationType !== 'General Population'
    })

    return kpData?.reduce<CountMap>((acc, curr) => {
      const { populationType } = curr
      if (acc[populationType] !== 0) {
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

  console.log(chartDatam, 'data')
  return (

        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[350px] w-1/2 bg-white rounded-lg"
        >
          {chartDatam && (
            <RadarChart data={chartDatam}
            cx='50%'
            cy={'50%'}
            outerRadius={'80%'}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <PolarAngleAxis dataKey={'populationType'} />
              <PolarGrid
              className='fill-[--color-desktop] opacity-20 '
              />
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

  )
}

export default PopulationTypeChart
