/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

const chartConfig = {
  refill: {
    label: 'Refill',
    color: 'rgba(54, 162, 235, 0.5)'
  },
  vl: {
    label: 'viral load',
    color: 'hsl(var(--chart-2))'
  },
  clinic: {
    label: 'Clinic Day',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type GroupData = Record<string, any>

export function AppointmentBarChart ({ data }: { data: AppointmentProps[] }) {
  const groupAppointmentsByDay = (appointments: any[]) => {
    const groupedData: GroupData = {}
    appointments?.forEach((appointment: { AppointmentAgenda: any, appointmentDate: any }) => {
      const { AppointmentAgenda, appointmentDate } = appointment
      if (!groupedData[appointmentDate]) {
        groupedData[appointmentDate] = { appointmentDate }
      }
      if (!groupedData[appointmentDate][AppointmentAgenda?.agendaDescription]) {
        groupedData[appointmentDate][AppointmentAgenda?.agendaDescription] = 0
      }
      groupedData[appointmentDate][AppointmentAgenda?.agendaDescription]++
    })
    return Object.values(groupedData)
  }

  // const chartData = transformDataToCart()
  const chartData = groupAppointmentsByDay(data)

  return (
    <div className="h-[300px] w-3/5 bg-white p-2">
      <div
        className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      "
      >
        <h3 className="font-semibold text-slate-700">Trend</h3>
      </div>
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] ">
        <BarChart
          accessibilityLayer
          data={chartData || []}
          margin={{
            top: 20
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="appointmentDate"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }}
          />
          <ChartTooltip
            // cursor={false}
            content={
              <ChartTooltipContent
                label={(value: string | number | Date) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="Refill"
            fill="var(--color-refill)"
            radius={[0, 0, 4, 4]}
            stackId={'a'}
          />
          <Bar
            dataKey="Clinic Day"
            fill="var(--color-clinic)"
            radius={[0, 0, 4, 4]}
            stackId={'a'}
          />
          <Bar
            dataKey="viral load"
            fill="var(--color-vl)"
            radius={[4, 4, 0, 0]}
            stackId={'a'}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
