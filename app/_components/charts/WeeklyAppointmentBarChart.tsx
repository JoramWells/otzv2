/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
import { Chart, type ChartDataset, registerables } from 'chart.js'

import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
// import { type MomentInput } from 'moment'
import { useCallback } from 'react'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import { useGetAllUserAvailabilitiesQuery } from '@/api/users/userAvailability.api'

interface DataProps {
  appointmentDate: Date
}

export interface BarChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'bar', Array<number | [number, number] | null>>>
}

Chart.register(...registerables)

const WeeklyAppointmentBarChart = () => {
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
    const daysOfWeek = filterAvailableWeekDays ? Object.keys(filterAvailableWeekDays) : []
    const appointmentsCountByDay = [0, 0, 0, 0, 0, 0, 0]

    weeklyData?.forEach((appointment: DataProps) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      const dayOfWeek = appointmentDate.getDay()
      appointmentsCountByDay[dayOfWeek]++
    })

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Appointments',
          data: appointmentsCountByDay
        }
      ]
    }
  }

  const chartData = transformDataToCart()

  return (
    <div className="h-[300px] w-1/2 rounded-lg bg-slate-50 p-2">
      <h1 className="font-bold text-lg">Weekly Appointment</h1>
      <div className="pb-10 pl-5 pr-5 w-full h-full">
        <Bar data={chartData} options={{
          plugins: {
            // title: {
            //   display: true,
            //   text: 'Patient Data'
            // }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
     />
      </div>
    </div>
  )
}

export default WeeklyAppointmentBarChart
