/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
// import { type UserDashboardCardDataListProps } from '@/app/_components/UserDasboard'
// import PopulationTypeChart from '@/components/Recharts/PopulationTypeChart'
import PatientVisitActivitiesChart from '@/app/_components/charts/PatientVisitActivitiesChart'
import { useGetPatientVisitByCountQuery } from '@/api/patient/patientVisits.api'
import { useUserContext } from '@/context/UserContext'
import { importantPatientColumn } from '../patients/_components/columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useGetCALHIVByHospitalIDQuery } from '@/api/patient/calhiv.api'
import { useCallback } from 'react'
import HorizontalLineChart from '@/components/Recharts/HorizontalLineChart'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const UserDashboardPage = () => {
  const dataList2 = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'dashboard',
      link: '#'
    }
  ]

  // const ageRanges: Array<[number, number]> = [
  //   [0, 9],
  //   [10, 19],
  //   [20, 24],
  //   [25, Infinity]
  // ]

  // const pieChartData = {
  //   labels: ['PAMA', 'OTZ', 'OTZ +', 'Adult'],
  //   datasets: [
  //     {
  //       data: calculateAgeRange(data || [], ageRanges),
  //       backgroundColor: ['#d197a4', '#36A2EB', '#FFCE56', '#4BC0C0']
  //     }
  //   ]
  // }

  // const uniqueYears: number[] | any = useMemo(() => {
  //   return [
  //     ...new Set(
  //       data?.map((item: any) =>
  //         new Date(item.dateConfirmedPositive).getFullYear()
  //       )
  //     )
  //   ]
  // }, [data])

  // uniqueYears.sort((a: number, b: number) => a - b)

  const { authUser, hospitalID } = useUserContext()

  const { data: importantPatients } = useGetPatientVisitByCountQuery({
    hospitalID: authUser?.hospitalID as string
  },
  {
    skip: !authUser?.hospitalID
  })

  console.log(importantPatients)

  const { data: hospitalData } = useGetCALHIVByHospitalIDQuery(
    {
      hospitalID: authUser?.role !== 'admin' ? (hospitalID as string) : ''
    },
    {
      skip: !hospitalID
    }
  )

  const formattedData = useCallback(() => {
    return Object.entries(hospitalData || {}).filter(([key]) => key.startsWith('age_'))?.map(([category, count]) => ({
      count: Number(count),
      line: category?.replace('age_', '')?.replace('_', '-')
    }))
  }, [hospitalData])()

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      {/*  */}
      {/* <div className="flex justify-between space-x-2 p-2 ">
        <RegisteredPatientsLineChart data={data || []} />

        <PieChart data={pieChartData} />
      </div> */}
      <div className="p-2 flex flex-row items-center justify-between space-x-2">
        <PatientVisitActivitiesChart />

        <div className="w-1/3">
          <HorizontalLineChart
            data={formattedData ?? []}
            dataKey="count"
            label="line"
            title="CALHIV"
          />
        </div>
      </div>

      <div className="flex justify-between p-2 pt-0 space-x-2">
        {/* <PopulationTypeChart data={data || []} /> */}
        <div className="bg-white rounded-lg flex-1 border ring ring-slate-100  ">
          <div
          className='p-2 bg-slate-50 border-b border-slate-100 rounded-t-lg mb-2 '
          >
            <h3 className="font-semibold  text-slate-800 text-[14px] ">
              Frequent Visits
            </h3>
          </div>

          <CustomTable
            isSearch={false}
            data={importantPatients ?? []}
            columns={importantPatientColumn}
          />

          {/*
            {value === 2 && (
              <CustomTable
                isSearch={false}
                data={recentPatients || []}
                columns={importantPatientColumn}
              />
            )} */}
        </div>
      </div>
      {/*  */}
    </>
  )
}

export default UserDashboardPage
