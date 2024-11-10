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
import { useMemo } from 'react'
import { type ExtendedAppointmentInputProps } from '@/api/appointment/appointment.api.'

type GroupData = Record<string, any>

// type ChartConfig = Record<string, { label: string, color: string }>

const colorSet = [1, 2, 3, 4, 5]
let colorIndex = 0

const getNextColor = () => {
  const nextColor = colorSet[colorIndex % colorSet.length]
  colorIndex++
  return `hsl(var(--chart-${nextColor}))`
}

export function AppointmentBarChart ({ data }: { data: ExtendedAppointmentInputProps[] }) {
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {}
    data?.forEach(({ AppointmentAgenda }) => {
      const { agendaDescription } = AppointmentAgenda
      if (!config[agendaDescription]) {
        config[agendaDescription] = {
          label: agendaDescription,
          color: getNextColor()
        }
      }
    })

    return config
  }, [data])

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

  // const chartConfig = generateChartConfig(data)

  return (
    <div className="h-[300px] flex-1 bg-white p-2">
      <div
        className="flex flex-row items-center justify-between
      pl-4 pr-4 pt-2
      "
      >
        <h4 className="font-semibold text-slate-700">Trend</h4>
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
          {Object.keys(chartConfig).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={chartConfig[key].color}
              // radius={[4, 4, 0, 0]}
              stackId={'a'}
            />
          ))}
          {/* <Bar
            dataKey="Refill"
            fill="var(--color-refill)"
            radius={[0, 0, 4, 4]}
            stackId={"a"}
          />
          <Bar
            dataKey="Clinic Day"
            fill="var(--color-clinic)"
            radius={[0, 0, 4, 4]}
            stackId={"a"}
          />
          <Bar
            dataKey="viral load"
            fill="var(--color-vl)"
            radius={[4, 4, 0, 0]}
            stackId={"a"}
          /> */}
        </BarChart>
      </ChartContainer>
    </div>
  )
}
