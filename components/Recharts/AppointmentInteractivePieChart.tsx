import React, { useEffect, useMemo, useState } from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'
import { type PieSectorDataItem } from 'recharts/types/polar/Pie'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartStyle,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  desktop: {
    label: 'Desktop'
  },
  mobile: {
    label: 'Mobile'
  },
  january: {
    label: 'January',
    color: 'hsl(var(--chart-1))'
  },
  february: {
    label: 'February',
    color: 'hsl(var(--chart-2))'
  }
}

const desktopData = [
  { month: 'january', desktop: 186, fill: 'var(--color-january)' },
  { month: 'february', desktop: 305, fill: 'var(--color-february)' }
]

const AppointmentInteractivePieChart = ({ data }) => {
  const id = 'pie-interactive'

  const groupAppointmentsByDay = (appointments: any[]) => {
    const groupedData = {}
    appointments?.forEach(
      (appointment: { AppointmentStatus: any, appointmentDate: any }) => {
        const { AppointmentStatus } = appointment
        const agenda = AppointmentStatus?.statusDescription
        if (!groupedData[agenda]) {
          const formattedAgenda = agenda.toLowerCase().replace(/\s+/g, '-')
          groupedData[agenda] = { agenda: formattedAgenda, count: 0, fill: `var(--color-${formattedAgenda})` }
        }

        groupedData[agenda].count++
      }
    )
    return Object.values(groupedData)
  }

  //
  const groupedData = groupAppointmentsByDay(data)

  //
  const createChartConfig = appointments => {
    const chartConfig = {
      title: {
        label: 'Appointments'
      },
      desktop: {
        label: 'Desktop'
      }
    }
    appointments?.forEach((item, index) => {
      const formattedAgenda = item.agenda.toLowerCase().replace(/\s+g/, '-')
      chartConfig[formattedAgenda] = {
        label: formattedAgenda,
        color: `hsl(var(--chart-${index + 1}))`
      }
    })

    return chartConfig
  }

  const weekData = groupAppointmentsByDay(data)
  const chartConfig = createChartConfig(weekData)

  const [activeMonth, setActiveMonth] = useState(weekData[0]?.agenda)
  const activeIndex = useMemo(
    () => weekData?.findIndex((item) => item.agenda === activeMonth),
    [weekData, activeMonth]
  )

  useEffect(() => {
    if (weekData) {
      setActiveMonth(weekData[0]?.agenda)
    }
  }, [weekData])

  console.log(chartConfig, 'chartconfig')
  console.log(weekData, 'weekData')
  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardContent>
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={weekData}
              dataKey={'count'}
              nameKey={'agenda'}
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline={'middle'}
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {weekData[activeIndex]?.agenda?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AppointmentInteractivePieChart
