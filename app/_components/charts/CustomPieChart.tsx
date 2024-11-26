/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { LabelList, Pie, PieChart } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

interface ChartDataItem {
  visitors: number
  browser: string
  fill: string
  name?: string
}

export default function CustomPieChart ({ data }: { data: any[] }) {
  // const { data } = useGetAllUserActivitiesCountQuery()
  const chartData: ChartDataItem[] =
    data?.map((item: {status: string, count: string}, index: number) => ({
      visitors: parseInt(item.count, 10),
      browser: `${item.status}`,
      fill: `hsl(var(--chart-${(index % 5) + 1}))` // Cycle through colors
    })) ?? []
  const chartConfig: ChartConfig = chartData.reduce<ChartConfig>(
    (config, item, index) => {
      config[item.name as string] = {
        label: item.browser,
        color: item.fill
      }
      return config
    },
    {
      visitors: { label: 'Visitors' }
    }
  )

  return (
    <div className="w-1/4 bg-white rounded-lg">
      <p className='text-[14px] font-bold ml-4 mt-4' >Appointment Status</p>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel/>} />
          <Pie data={chartData} dataKey="visitors" nameKey="browser">
            <LabelList
              dataKey="browser"
              className="fill-background text-white"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
