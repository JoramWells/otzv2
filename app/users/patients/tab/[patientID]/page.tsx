/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

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
export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const { patientID } = params
  const { data } = useGetViralLoadTestQuery(patientID)
  console.log(data)
  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />

      <div>Avatar</div>
    </div>
  )
}

export default PatientDetails
