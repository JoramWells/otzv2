import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { type AppointmentProps } from '@/app/appointments/columns'
import PieChart from './PieChart'

// interface AppointmentStatuses {
//   status: 'Pending' | 'Upcoming' | 'Completed'
// }

const AppointmentPieChart = () => {
  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: '2022-01-01',
    mode: 'weekly'
  })

  const statusCount = (appointment: AppointmentProps[]) => {
    return appointment?.reduce(
      (counts, appointment) => {
        counts[appointment.AppointmentStatus?.statusDescription]++
        return counts
      },
      { Pending: 0, Upcoming: 0, Completed: 0, Rescheduled: 0, Cancelled: 0 }
    )
  }

  const counts = statusCount(weeklyData as AppointmentProps[])

  const data = {
    labels: ['Pending', 'Upcoming', 'Completed', 'Rescheduled', 'Cancelled'],
    datasets: [
      {
        data: [
          counts.Pending,
          counts.Upcoming,
          counts.Completed,
          counts.Rescheduled,
          counts.Cancelled
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
      <PieChart data={data} />
  )
}

export default AppointmentPieChart
