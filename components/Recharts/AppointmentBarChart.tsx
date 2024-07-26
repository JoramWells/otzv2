/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

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
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useGetAllUserAvailabilitiesQuery } from '@/api/users/userAvailability.api'
import { useCallback } from 'react'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import moment from 'moment'

const chartConfig = {
  desktop: {
    label: 'Refill',
    color: 'rgba(54, 162, 235, 0.5)'
  },
  mobile: {
    label: 'viral load',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

interface DataProps {
  appointmentDate: Date
}

export function AppointmentBarChart () {
  const currentDate = moment().format('YYYY-MM-DD')
  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: currentDate,
    mode: 'weekly'
  })
  const { data: availabilityData } = useGetAllUserAvailabilitiesQuery()
  const weekDays = useCallback(() => {
    return availabilityData?.map((item: any) => item.daysAvailable)
  }, [availabilityData])()

  const filterAvailableWeekDays = useCallback(() => {
    const tempData = weekDays
      ? Object.fromEntries(
        Object.entries(weekDays[0]).filter(([key, value]) => value === true)
      )
      : []
    return tempData
  }, [weekDays])()

  const transformDataToCart = () => {
    const daysOfWeek = filterAvailableWeekDays
      ? Object.keys(filterAvailableWeekDays)
      : []
    const appointmentsCountByDay = [0, 0, 0, 0, 0, 0, 0]

    weeklyData?.forEach((appointment: DataProps) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      const dayOfWeek = appointmentDate.getDay()
      appointmentsCountByDay[dayOfWeek]++
    })

    return daysOfWeek?.map((day, week) => {
      return { day: [day], count: appointmentsCountByDay[week] }
    })
    // return {
    //   labels: daysOfWeek,
    //   datasets: appointmentsCountByDay

    // }
  }

  const groupAppointmentsByDay = (appointments) => {
    const groupedData = {}
    appointments?.forEach(appointment => {
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
  const chartData = groupAppointmentsByDay(weeklyData)
  console.log(groupAppointmentsByDay(weeklyData), 'chartdata')

  return (
    <div className="h-[300px] w-1/2 ">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Label</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
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
                // tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="Refill"
                fill="var(--color-desktop)"
                radius={[0, 0, 4, 4]}
                stackId={'a'}
              />
              <Bar
                dataKey="viral load"
                fill="var(--color-mobile)"
                radius={[4, 4, 0, 0]}
                stackId={'a'}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
