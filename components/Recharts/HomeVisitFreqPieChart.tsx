import React, { useCallback, useMemo } from 'react'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  // ChartStyle,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import { type HomVisitConfigInputProps } from '@/api/homevisit/homeVisitConfig.api'

const chartConfig = {
  count: {
    label: 'Count'
  },
  once: {
    label: 'Once',
    color: 'hsl(var(--chart-1))'
  },
  daily: {
    label: 'Daily',
    color: 'hsl(var(--chart-2))'
  },
  weekly: {
    label: 'Weekly',
    color: 'hsl(var(--chart-3))'
  },
  monthly: {
    label: 'Monthly',
    color: 'hsl(var(--chart-4))'
  },
  bimonthly: {
    label: 'Bimonthly',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

const HomeVisitFreqPieChart = ({
  data
}: {
  data: HomVisitConfigInputProps[]
}) => {
  const tempData = useMemo(() => {
    return data?.length > 0 ? [...data] : []
  }, [data])

  const fData = useCallback(() => {
    return tempData.filter((item) => item.frequency !== null)
  }, [tempData])()

  const transformData = () =>
    fData?.reduce((acc: any[], { frequency }) => {
      const formattedFreq = frequency?.toLowerCase()
      const colorVar = `var(--color-${formattedFreq})`

      const existingEntry = acc.find(
        (item) => item.frequency === formattedFreq
      )
      if (existingEntry != null) {
        existingEntry.count += 1
      } else {
        acc.push({
          frequency: formattedFreq,
          count: 1,
          fill: colorVar
        })
      }

      return acc
    }, [])

  console.log(transformData())

  return (
    <div className="bg-white p-4 rounded-lg w-1/4">
      <h3 className="text-slate-700 font-semibold">Home visit Frequency</h3>
      <ChartContainer
        config={chartConfig}
        className=" mx-auto aspect-square max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="count" hideLabel />}
          />

          <Pie data={transformData()} dataKey="count" />
          {/* <LabelList
            dataKey={'frequency'}
            className='fill-background'
            stroke='none'
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>

              chartConfig[value]?.label
            }
            />
          </Pie> */}

          {/*  */}
          <ChartLegend content={<ChartLegendContent nameKey="frequency" />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default HomeVisitFreqPieChart
