'use client'

import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'
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

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <HomeVisitTab patientID={patientID} />
    </>
  )
}
export default Appointments
