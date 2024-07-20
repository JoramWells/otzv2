import PieChart from '@/app/_components/charts/PieChart'
import React from 'react'

interface RegimenLineProps {
  'Current Regimen Line': 'First line' | 'Second line' | 'Third line'

}

interface InputProps {
  data: RegimenLineProps[]
}

const CustomPieChart = ({ data }: InputProps) => {
  const regimenLineCount = (regimenLines: RegimenLineProps[]) => {
    return regimenLines?.reduce(
      (counts, regimenLine) => {
        const line = regimenLine['Current Regimen Line']
        if (line) {
          counts[line]++
        }
        return counts
      },
      { 'First line': 0, 'Second line': 0, 'Third line': 0 }
    )
  }
  const count = regimenLineCount(data)

  const regimenData = {
    labels: ['First line', 'Second line', 'Third line'],
    datasets: [
      {
        data: [count['First line'], count['Second line'], count['Third line']],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  }

  console.log(count)
  return <PieChart data={regimenData} />
}

export default CustomPieChart
