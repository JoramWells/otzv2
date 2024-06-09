/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { calculateBMI } from '@/utils/calculateBMI'

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
  const bmiData = patientData?.map((item: any) => {
    return calculateBMI(item.weight, item.height)
  })
  console.log(patientData, 'vitals')

  const data = {
    labels: patientData?.map((item: any) =>
      moment(item?.createdAt).format('ll')
    ),
    datasets: [
      {
        label: 'Height',
        data: patientData?.map((item: any) => item.height),
        borderColor: 'rgb(75, 192, 192)',
        yAxisID: 'y1',
        fill: false
      },
      {
        label: 'Weight',
        data: patientData?.map((item: any) => item.weight),
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y2',
        fill: false
      },
      {
        label: 'BMI',
        data: bmiData,
        borderColor: 'rgb(54, 162, 235)',
        yAxisID: 'y3',
        fill: false
      }
    ]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    scales: {
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Height (cm)'
        }
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      y3: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: 'BMI (kg)'
        }
      }
    }
  }

  return <Line data={data} options={options} />
}

export default WeightHeightLineChart
