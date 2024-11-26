/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { Pie, PieChart } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useGetAllUserActivitiesCountQuery, type UserActivityData } from '@/api/patient/patientVisits.api'

interface ChartDataItem {
  visitors: number
  browser: string
  fill: string
  name?: string
}

export function UserActivitiesChart () {
  const { data } = useGetAllUserActivitiesCountQuery()
  console.log(data, 'dtm')
  const chartData: ChartDataItem[] =
    data?.map((item: UserActivityData, index: number) => ({
      visitors: parseInt(item.count, 10),
      browser: `${item.User?.firstName} ${item.User?.middleName}`,
      fill: `hsl(var(--chart-${(index % 5) + 1}))` // Cycle through colors
    })) ?? []
  const chartConfig: ChartConfig = chartData.reduce<ChartConfig>(
    (config, item, index) => {
      config[item.name as string] = {
        label: item.name,
        color: item.fill
      }
      return config
    },
    {
      visitors: { label: 'Visitors' }
    }
  )

  return (
    <div className="w-1/2">

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>

    </div>
  )
}
