'use client'

import dynamic from 'next/dynamic'
import MedicalFileTab from '../../../_components/MedicalFileTab'
import { Skeleton } from '@/components/ui/skeleton'
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
  // const { patientID } = params

  return (
    <div className='p-4'>
      <BreadcrumbComponent dataList={dataList2} />

      <div>
        <p className='font-bold'>Allergies</p>
      </div>

      <MedicalFileTab />
    </div>
  )
}
export default Appointments
