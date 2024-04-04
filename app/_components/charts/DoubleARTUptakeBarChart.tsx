import React from 'react'
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

  const options = {
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  }
  return <Bar data={data} options={options} />
}

export default DoubleARTUptakeBarChart
