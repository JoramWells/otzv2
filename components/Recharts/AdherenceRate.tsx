'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

export const description = 'A line chart'

// const chartData = [
//   { month: 'January', desktop: 186 },
//   { month: 'February', desktop: 305 },
//   { month: 'March', desktop: 237 },
//   { month: 'April', desktop: 73 },
//   { month: 'May', desktop: 209 },
//   { month: 'June', desktop: 214 }
// ]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

function AdherenceRate ({ data }: { data: Array<{ adherenceRate: string, date: string }> }) {
  const chartData = data?.map((item) => ({
    desktop: item.adherenceRate,
    month: new Date(item.date)
  }))

  return (
    <div className="flex-1">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto p-6  h-[200px] w-full bg-white rounded-lg"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value: Date) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
            labelFormatter={(value: Date) => {
              return new Date(value).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export default AdherenceRate
