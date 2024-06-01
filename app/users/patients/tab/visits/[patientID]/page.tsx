/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { useGetHistoryPatientVisitQuery } from '@/api/patient/patientVisits.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
  const { patientID } = params
  const { data: patientHistory } = useGetHistoryPatientVisitQuery(patientID)
  console.log(patientHistory, 'kl')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="p-2">
        <div className="bg-white p-2 rounded-lg">
          <CustomTable
            data={patientHistory || []}
            columns={columns}
            isSearch={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
