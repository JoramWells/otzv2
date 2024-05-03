/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllCaregiversQuery } from '@/api/caregiver/caregiver.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'

const Page = () => {
  const { data } = useGetAllCaregiversQuery()
  console.log(data)
  return (
    <div className="p-4">
      <h1 className="text text-2xl font-bold text-slate-700 mb-4">Caregivers</h1>
      <CustomTable columns={columns} data={data || []} />
    </div>
  )
}

export default Page
