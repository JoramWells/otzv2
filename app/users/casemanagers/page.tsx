/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllCaseManagersQuery } from '@/api/caregiver/casemanager.api'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: ''
  },
  {
    id: '2',
    label: 'Case Managers',
    link: 'casemanager'
  }
]

const Page = () => {
  const { data } = useGetAllCaseManagersQuery()
  console.log(data, 'MNK')
  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />
      <h1 className="text text-xl font-bold text-slate-700 mb-4">Case Managers</h1>
      <CustomTable columns={columns} data={data || []} />
    </div>
  )
}

export default Page
