'use client'

import CareGiverTab from '@/app/users/patients/_components/CareGiverTab'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
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
    label: 'Patients',
    link: ''
  }
]

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <CareGiverTab patientID={patientID} />
    </>
  )
}
export default Appointments
