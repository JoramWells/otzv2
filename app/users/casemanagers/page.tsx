/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllCaseManagersQuery } from '@/api/caregiver/casemanager.api'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'
import HeaderTitle from '../_components/HeaderTitle'

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
  console.log(data, 'MNK')
  return (
    <div className="flex flex-col space-y-2">
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
