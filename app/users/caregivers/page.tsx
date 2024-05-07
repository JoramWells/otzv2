/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllCaregiversQuery } from '@/api/caregiver/caregiver.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
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

      <HeaderTitle
        label="Add Caregivers"
        title="Caregivers"
        link={'/users/add-care-giver'}
      />
      <div className="p-4">
        <div className="p-4 bg-white rounded-lg">
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  )
}

export default Page
