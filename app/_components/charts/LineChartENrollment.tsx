/* eslint-disable react/prop-types */
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { type Point, type ChartDataset } from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

interface Props {
  data: LineChartProps
}

export interface LineChartProps {
  labels: string[]
  datasets: Array<ChartDataset<'line', Array<number | Point | null>>>
}

// Process the dataset
const processData = (dataset) => {
  // Initialize arrays to hold male and female data
  const maleData = []
  const femaleData = []

  // Initialize objects to store counts for each date
  const maleCountByDate = {}
  const femaleCountByDate = {}

  // Iterate over the dataset
  dataset?.forEach((entry) => {
    const { enrollmentDate, gender } = entry

    // Increment counts based on gender and date
    if (gender === 'male') {
      maleCountByDate[enrollmentDate] = (maleCountByDate[enrollmentDate] || 0) + 1
    } else if (gender === 'female') {
      femaleCountByDate[enrollmentDate] = (femaleCountByDate[enrollmentDate] || 0) + 1
    }
  })

  // Generate arrays of counts for male and female patients
  Object.entries(maleCountByDate).forEach(([date, count]) => {
    maleData.push(count)
  })

  Object.entries(femaleCountByDate).forEach(([date, count]) => {
    femaleData.push(count)
  })

  return { maleData, femaleData }
}

const LineChartEnrollment = () => {
  const { data } = useGetAllPatientsQuery()

  const uniqueDates = Array.from(new Set(data?.map((entry) => entry.dateOfEnrollmentDate)))

  // Sort the unique dates in ascending order
  uniqueDates.sort()

  const { maleData, femaleData } = processData(data)
  console.log(data, 'ui')
  // Prepare data for the chart
  const chartData = {
    labels: uniqueDates, // Array of dates
    datasets: [
      {
        label: 'Male Patients',
        data: maleData, // Array of male patient data
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)'
      },
      {
        label: 'Female Patients',
        data: femaleData, // Array of female patient data
        borderColor: 'pink',
        backgroundColor: 'rgba(255, 0, 255, 0.1)'
      }
    ]
  }

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            month: 'MMM YYYY'
          }
        },
        title: {
          display: true,
          text: 'Date of Enrollment'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Patients'
        }
      }
    }
  }
  return (
    <div className="h-[400px] md:w-full border rounded-lg p-5">
      {/* <Line
        data={chartData}
        options={chartOptions}
      /> */}
    </div>
  )
}

export default LineChartEnrollment
