/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { type ExtendedPatientVisitsInterface, useGetHistoryPatientVisitQuery } from '@/api/patient/patientVisits.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [total, setTotal] = useState(0)
  const [historyData, setHistoryData] = useState<ExtendedPatientVisitsInterface[] | undefined>([])

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
  useEffect(() => {
    if (patientHistory) {
      setHistoryData(patientHistory?.data)
      setTotal(patientHistory?.total)
    }
    // if (tab === null) {
    //   setTabValue("All");
    // }
  }, [patientHistory])
  console.log(patientHistory, 'kl')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2">
        <div className="bg-white p-2 rounded-lg">
          <CustomTable
            data={historyData ?? []}
            columns={columns}
            // isSearch={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
