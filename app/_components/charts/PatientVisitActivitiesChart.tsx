'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useGetAllUserPatientCountQuery } from '@/api/patient/patientVisits.api'

const chartConfig = {
  views: {
    label: 'Patient Visits'
  },
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-2))'
  }

} satisfies ChartConfig

export default function PatientVisitActivitiesChart () {
  const { data: dtm } = useGetAllUserPatientCountQuery()

  return (
    <div className="bg-white rounded-lg pb-4 pt-2">
      <div className="p-2 pt-0">
        <p className="font-semibold text-slate-700">Recent Patient Visits</p>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[200px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={dtm}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value as Date)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="visits"
                labelFormatter={(value) => {
                  return new Date(value as Date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }}
              />
            }
          />
          <Bar dataKey="count" fill={'var(--color-count)'} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
