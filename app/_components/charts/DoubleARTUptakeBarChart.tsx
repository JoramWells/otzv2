import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

interface DataProps {
  morningTrueCount: number
  morningFalseCount: number
  eveningTrueCount: number
  eveningFalseCount: number
}

Chart.register(...registerables)

const DoubleARTUptakeBarChart = ({
  morningTrueCount,
  morningFalseCount,
  eveningTrueCount,
  eveningFalseCount
}: DataProps) => {
  const data = {
    labels: ['Morning', 'Evening'],
    datasets: [
      {
        label: 'True',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        data: [morningTrueCount, eveningTrueCount]
      },
      {
        label: 'False',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: [morningFalseCount, eveningFalseCount]
      }
    ]
  }

  return (
    <div
      className="h-[350px] md:w-[500px] bg-slate-50 rounded-lg
  w-1/2 p-4
  "
    >
      <Bar
        data={data}
        options={{
          // scales: {
          //   xAxes: [
          //     {
          //       scaleLabel: {
          //         display: true,
          //         labelString: 'Time Duration'
          //       }
          //     }
          //   ]
          // },
          plugins: {
            title: {
              display: true,
              text: 'Daily Dosage'
            }
          },
          // scales: {
          //   xAxes: [{ stacked: true }]
          // },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </div>
  )
}

export default DoubleARTUptakeBarChart
