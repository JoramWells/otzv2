/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { type AppointmentProps } from '@/app/appointments/columns'
import PieChart from './PieChart'

// interface AppointmentStatuses {
//   status: 'Pending' | 'Upcoming' | 'Completed'
// }

interface AppointmentProps {
  AppointmentStatus: {
    statusDescription: 'Pending' | 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled'
  }
}

interface InputProps {
  data: AppointmentProps[]
}

const AppointmentPieChart = ({ data }: InputProps) => {
  const statusCount = (appointment: AppointmentProps[]) => {
    return appointment?.reduce(
      (counts, appointment) => {
        const status = appointment.AppointmentStatus?.statusDescription
        if (status) {
          counts[status]++
        }
        return counts
      },
      { Pending: 0, Upcoming: 0, Completed: 0, Rescheduled: 0, Cancelled: 0 }
    )
  }

  const counts = statusCount(data)

  const pieData = {
    labels: ['Pending', 'Upcoming', 'Completed', 'Rescheduled', 'Cancelled'],
    datasets: [
      {
        data: [
          counts?.Pending,
          counts?.Upcoming,
          counts?.Completed,
          counts?.Rescheduled,
          counts?.Cancelled
        ],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ]
      }
    ]
  }

  return (

      <PieChart data={pieData} />
  )
}

export default AppointmentPieChart
