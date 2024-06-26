/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { columns } from './columns'
import { useGetAllCaseManagersQuery } from '@/api/caregiver/casemanager.api'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomTable } from '@/app/_components/table/CustomTable'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const HeaderTitle = dynamic(
  async () => await import('../_components/HeaderTitle'),
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
    label: 'Case Managers',
    link: 'casemanager'
  }
]

const Page = () => {
  const { data } = useGetAllCaseManagersQuery()
  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

        <HeaderTitle
          label="Create Case Manager"
          title="Case Managers"
          link={'/users/add-case-manager/'}
        />

      <div className="p-4">
        <div className="bg-white p-4 rounded-lg">
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  )
}

export default Page
