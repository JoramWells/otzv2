/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { useGetHistoryPatientVisitQuery } from '@/api/patient/patientVisits.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import usePreprocessData from '@/hooks/usePreprocessData'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px]" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')

  const { patientID } = params
  const page = searchParams.get('page')

  const { data: patientHistory } = useGetHistoryPatientVisitQuery(
    {
      id: patientID,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search
    }
  )

  const { data: historyData, total } = usePreprocessData(patientHistory)

  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2">
        <div className="bg-white p-2 rounded-lg">
          <CustomTable
            data={historyData ?? []}
            columns={columns}
            total={total as number}
            search={search}
            setSearch={setSearch}
            // isSearch={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
