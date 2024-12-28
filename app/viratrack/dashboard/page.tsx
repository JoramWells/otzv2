/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllVlCategoriesQuery, useGetRecentVLQuery, useGetVlReasonsQuery } from '@/api/lab/viralLoadTests.api'
import { useUserContext } from '@/context/UserContext'
import { AppointmentBarChart } from '@/components/Recharts/AppointmentBarChart'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { useCallback, useState } from 'react'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from '../viratrack/columns'
import CustomPieChart from '@/app/_components/charts/CustomPieChart'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

// const VLBarChart = dynamic(
//   async () => await import('../../_components/charts/VLBarChart'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
//   }
// )

// const VLPieChart = dynamic(
//   async () => await import('../../_components/charts/VLPieChart'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
//   }
// )

type InputObject = Record<string, any> // Generic object type
type OutputObject = Record<string, string | number>

function renameKey (obj: InputObject, oldKey: string, newKey: string): OutputObject {
  // Ensure the oldKey exists in the object
  if (oldKey in obj) {
    // Return a new object with the desired key renamed
    return Object.entries(obj).reduce<OutputObject>((acc, [key, value]) => {
      if (key === oldKey) {
        acc[newKey] = key === 'count' ? value : value // Convert 'count' to number
      } else {
        acc[key] = key === 'count' ? Number(value) : value // Handle 'count' separately
      }
      return acc
    }, {})
  }
  return obj // Return the original object if oldKey doesn't exist
}

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
  }
]

const VLPage = () => {
  const [dateQuery, setDateQuery] = useState('')
  const { hospitalID } = useUserContext()
  const { data, isLoading } = useGetRecentVLQuery({
    hospitalID: hospitalID as string
  }, {
    skip: hospitalID == null
  })

  // const { data: vlSuppression } = useGetVLSuppressionRateQuery({
  //   hospitalID: user?.hospitalID,
  //   startDate: new Date('2023-04-05'),
  //   endDate: new Date('2024-11-09')
  // },
  // {
  //   skip: !user?.hospitalID
  // })

  const { data: vlReasonsData } = useGetVlReasonsQuery({
    hospitalID: hospitalID as string,
    dateQuery
  },
  {
    skip: (hospitalID) == null
  }
  )

  const { data: vlCategoryData } = useGetAllVlCategoriesQuery({
    hospitalID: hospitalID as string
  }, {
    skip: hospitalID == null
  })

  const updateData = useCallback(() => {
    return vlCategoryData?.map(item => renameKey(Object.freeze(item), 'category', 'status'))
  }, [vlCategoryData])()

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div
        className="flex flex-row
        bg-white rounded-lg mb-1 p-2 mt-1
         justify-between items-center"
      >
        <h3
          className="font-semibold
        capitalize text-[14px] text-slate-800
        "
        >
          Analytics Appointments
        </h3>
        <div className="w-1/4">
          <CustomSelectParams
            paramValue="dateQuery"
            value={dateQuery}
            onChange={setDateQuery}
            data={[
              {
                id: 'All',
                label: 'All'
              },
              {
                id: '7D',
                label: '7D'
              },
              {
                id: '14D',
                label: '14D'
              },
              {
                id: '21D',
                label: '21D'
              },
              {
                id: '1 month',
                label: '1 month'
              }
            ]}
          />
        </div>
      </div>
      <div className=" p-2">
        <div className="flex flex-row space-x-2">
          <AppointmentBarChart
            data={vlReasonsData ?? []}
            dataKey="dateOfVl"
            label="vlJustification"
          />

          {/* <VLPieChart /> */}
          <CustomPieChart title='Viral Load Categories' data={updateData ?? []} />
        </div>
        <div className="bg-white rounded-lg border border-slate-200 mt-2">
          <div className="p-2 bg-slate-50 border-b border-slate-200 rounded-t-lg mb-2">
            <p className="font-semibold text-[14px]">Recent Viral Load</p>
          </div>
          <CustomTable
            data={data ?? []}
            columns={columns}
            isSearch={false}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default VLPage
