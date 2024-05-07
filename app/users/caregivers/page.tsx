/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllCaregiversQuery } from '@/api/caregiver/caregiver.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const HeaderTitle = dynamic(async () => await import('../_components/HeaderTitle'), {
  ssr: false
})

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
    label: 'caregivers',
    link: 'caregivers'
  }
]

const Page = () => {
  const { data } = useGetAllCaregiversQuery()
  console.log(data)
  return (
    <div className="w-full flex flex-col space-y-2">
      <BreadcrumbComponent dataList={dataList2} />
      <Suspense fallback={<Skeleton className='p-2 w-full' />}>
        <HeaderTitle
          label="Add Caregivers"
          title="Caregivers"
          link={'/users/add-care-giver'}
        />
      </Suspense>

      <div className="p-4">
        <div className="p-4 bg-white rounded-lg">
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  )
}

export default Page
