'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { type UptakeCountInterface } from '@/context/PharmacyContext'

const chartConfig = {
  falseCount: {
    label: 'False',
    color: 'rgba(255, 99, 132, 0.5)'
  },
  trueCount: {
    label: 'True',
    color: 'rgba(75, 192, 192, 0.5)'
  }
} satisfies ChartConfig

export function DailyPillUptake ({ data }: { data: UptakeCountInterface }) {
  const transformData = [
    {
      month: 'Morning',
      trueCount: data.morningTrue,
      falseCount: data.morningFalse
    },
    {
      month: 'Evening',
      trueCount: data.eveningTrue,
      falseCount: data.eveningFalse
    }
  ]
  return (
    <div className="w-1/3 h-[250px] bg-white ring-1 ring-slate-100 rounded-lg border border-slate-200 ">
      <div className="p-2 bg-slate-50 border-b border-slate-200 rounded-t-lg font-semibold text-slate-800 text-[14px]">
        Daily Pill Uptake
      </div>
      {/* <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <div className="h-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transformData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="falseCount"
            //   stackId="a"
              fill="var(--color-falseCount)"
              width={50}
              height={20}
              radius={5}
            />
            <Bar
              dataKey="trueCount"
            //   stackId="a"
              fill="var(--color-trueCount)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
