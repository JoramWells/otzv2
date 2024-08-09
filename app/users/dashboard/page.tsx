/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { useGetAllPatientsQuery, useGetImportantPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
// import { type UserDashboardCardDataListProps } from '@/app/_components/UserDasboard'
import PopulationTypeChart from '@/components/Recharts/PopulationTypeChart'
import RegisteredPatientsLineChart from '@/components/Recharts/RegisteredPatientsLineChart'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { importantPatientColumn } from '../patients/_components/columns'

// const UserDashboardCard = dynamic(
//   async () => await import('@/app/_components/UserDasboard'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-[110px] rounded-lg flex-1 p-4" />
//   }
// )

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

//

const PieChart = dynamic(
  async () => await import('../../_components/charts/PieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] md:w-1/4" />
  }
)

const NotifyPage = () => {
  const { data } = useGetAllPatientsQuery()

  // const dataList: UserDashboardCardDataListProps[] =

  const dataList2 = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'dashboard',
      link: 'dashboard'
    }
  ]

  const ageRanges: Array<[number, number]> = [
    [0, 9],
    [10, 19],
    [20, 24],
    [25, Infinity]
  ]

  const pieChartData = {
    labels: ['PAMA', 'OTZ', 'OTZ +', 'Adult'],
    datasets: [
      {
        data: calculateAgeRange(data || [], ageRanges),
        backgroundColor: ['#d197a4', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  }

  const uniqueYears: number[] | any = useMemo(() => {
    return [
      ...new Set(
        data?.map((item: any) =>
          new Date(item.dateConfirmedPositive).getFullYear()
        )
      )
    ]
  }, [data])

  uniqueYears.sort((a: number, b: number) => a - b)

  // Count the number of patients for each year
  const patientsCountPerYear = uniqueYears.map((year: any) => {
    return data?.filter((item: any) => new Date(item.dateConfirmedPositive).getFullYear() === year).length
  })

  const { data: importantPatients } = useGetImportantPatientsQuery({
    limit: 5
  })
  console.log(importantPatients, 'important patients')

  return (
    <div className="w-full">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="bg-white p-4 flex flex-col space-y-2 rounded-lg">
        {/*  */}
        <div className="flex justify-between space-x-4 ">
          <RegisteredPatientsLineChart data={data} />

          <PieChart data={pieChartData} />
        </div>
        <div className="flex justify-between">
          <PopulationTypeChart data={data} />
          <div>
            <div>Starred Patients</div>
            <CustomTable 
            data={importantPatients || []}
            columns={importantPatientColumn}
            />
            <div className='flex space-x-4' >
              <div>Name</div>
              <div>Gender</div>
              <div>Phone</div>
              <div>Population Type</div>
            </div>

            {importantPatients?.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div>
                  {item.firstName} {item.middleName}
                </div>
                <div>{item.sex}</div>
                <div>{item.phoneNo}</div>
                <div>{item.populationType}</div>
              </div>
            ))}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default NotifyPage
