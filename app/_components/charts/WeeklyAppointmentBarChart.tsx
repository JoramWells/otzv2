/* eslint-disable react/prop-types */
import { Chart, type ChartOptions, type ChartDataset, registerables } from 'chart.js'

import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
// import { type MomentInput } from 'moment'
import React from 'react'
import { Bar } from 'react-chartjs-2'

// interface Props {
//   data: BarChartProps
// }

interface DataProps {
  appointmentDate: Date
}

export interface BarChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'bar', Array<number | [number, number] | null>>>
}

const chartOptions = {
  scales: {
    xAxes: {
      // type: 'linear'
      // ticks: {
      //   beginAtZero: true
      // },
      scaleLabel: {
        display: true,
        labelString: 'Day of the Week'
      }
    },
    yAxes:
      {
        // type: 'linear'
        scaleLabel: {
          display: true,
          labelString: 'Number of Appointments'
        }
        // ticks: {
        //   beginAtZero: true
        // }
      }

  }
}
Chart.register(...registerables)

const WeeklyAppointmentBarChart = () => {
  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: '2022-01-01',
    mode: 'weekly'
  })
  console.log(weeklyData, 'wered')

  const transformDataToCart = () => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
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
    <div className="h-[320px] w-[500px] border rounded-lg">
      <h1 className="font-bold text-lg">Enrollment</h1>
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
