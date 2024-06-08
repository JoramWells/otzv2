// src/components/MultiAxisLineChart.js

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useGetAllVitalSignByPatientIDQuery } from '@/api/vitalsigns/vitalSigns.api'
import moment from 'moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const WeightHeightLineChart = ({ patientID }: { patientID: string }) => {
  const { data: patientData } = useGetAllVitalSignByPatientIDQuery(patientID)
  console.log(patientData, 'vitals')

  const data = {
    labels: patientData?.map((item) => moment(item?.createdAt).format('ll')),
    datasets: [
      {
        label: 'Height',
        data: patientData?.map((item) => item.height),
        borderColor: 'rgb(75, 192, 192)',
        yAxisID: 'y1',
        fill: false
      },
      {
        label: 'Weight',
        data: patientData?.map((item) => item.weight),
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y2',
        fill: false
      }
    ]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Height (cm)'
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      }
    }
  }

  return <Line data={data} options={options} />
}

export default WeightHeightLineChart
