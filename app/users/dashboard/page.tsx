/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/require-array-sort-compare */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { calculateAgeRange } from '@/utils/calculateAgeRange'
import { useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
// import { type UserDashboardCardDataListProps } from '@/app/_components/UserDasboard'
import PopulationTypeChart from '@/components/Recharts/PopulationTypeChart'
import RegisteredPatientsLineChart from '@/components/Recharts/RegisteredPatientsLineChart'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { importantPatientColumn } from '../patients/_components/columns'
import { Button } from '@/components/ui/button'
import { type PatientAttributes } from 'otz-types'
import { calculateAge } from '@/utils/calculateAge'
import { useGetImportantPatientQuery } from '@/api/patient/importantPatients.api'
import { useSession } from 'next-auth/react'

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
  let { data } = useGetAllPatientsQuery()

  data = data?.filter(item => calculateAge(item.dob) < 25)

  // const dataList: UserDashboardCardDataListProps[] =
  const filteredArray: PatientAttributes[] = data ? [...data] : []
  filteredArray.sort(
    (a, b) =>
      new Date(b.createdAt as unknown as string).getTime() -
      new Date(a.createdAt as unknown as string).getTime()
  )

  // const recentPatients = filteredArray?.slice(0, 3)

  const dataList2 = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'dashboard',
      link: '/dashboard'
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

  const { data: session } = useSession()

  const { data: importantPatients } = useGetImportantPatientQuery(session?.user.id as string)
  const [value, setValue] = useState(1)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

        {/*  */}
        <div className="flex justify-between space-x-2 p-2 ">
          <RegisteredPatientsLineChart data={data || []} />

          <PieChart data={pieChartData} />
        </div>
        <div className="flex justify-between pl-2 pr-2 pb-2 space-x-2">
          <PopulationTypeChart data={data || []} />
          <div className="p-2 bg-white rounded-lg flex-1  ">

              <h3 className="font-semibold ml-2 text-slate-700 ">Quick Access</h3>
              <div className="flex flex-row space-x-2">
                {[
                  { id: 1, label: 'Pinned' },
                  { id: 2, label: 'Recent' }
                ].map((item) => (
                  <Button
                  size={'sm'}
                    key={item.id}
                    onClick={() => setValue(item.id)}
                    className={`text-slate-700 hover:bg-slate-50 bg-transparent hover:text-teal-600 rounded-none
                      ${
                        value === item.id &&
                        'border-b-2 border-teal-600 text-teal-600'
                      }
                      `}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            {value === 1 && (
              <CustomTable
                isSearch={false}
                data={importantPatients || []}
                columns={importantPatientColumn}
              />
            )}

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

export default NotifyPage
