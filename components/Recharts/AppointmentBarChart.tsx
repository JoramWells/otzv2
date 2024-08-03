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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useGetAllUserAvailabilitiesQuery } from '@/api/users/userAvailability.api'
import { useCallback, useState } from 'react'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import moment from 'moment'
import CustomSelect from '../forms/CustomSelect'

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

interface DataProps {
  appointmentDate: Date
}

export function AppointmentBarChart () {
  const currentDate = moment().format('YYYY-MM-DD')
  const [value, setValue] = useState<string>('weekly')

  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: currentDate,
    mode: value
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

  const groupAppointmentsByDay = (appointments: any[]) => {
    const groupedData = {}
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
  const chartData = groupAppointmentsByDay(weeklyData)

  const handleSelectChange = (val: string) => {
    setValue(val)
  }

  return (
    <div className="h-[300px] w-1/2 ">
      <Card
      className='border-none shadow-none'
      >
        <CardHeader
        className='flex flex-row justify-between'
        >
          <div>
            <CardTitle>Bar Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
          <div
          className='w-1/4'
          >
            <CustomSelect
              placeholder="Years"
              data={[
                { id: 'all', label: 'all' },
                { id: 'weekly', label: 'weekly' },
                { id: 'monthly', label: 'monthly' }
              ]}
              value={value}
              onChange={(val) => {
                handleSelectChange(val)
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] "
          >
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
        </CardContent>
      </Card>
    </div>
  )
}
