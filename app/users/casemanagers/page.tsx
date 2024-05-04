/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllCaseManagersQuery } from '@/api/caregiver/casemanager.api'

const Page = () => {
  const { data } = useGetAllCaseManagersQuery()
  console.log(data)
  return (
    <div className="p-4">
      <h1 className="text text-2xl font-bold text-slate-700 mb-4">Case Managers</h1>
      <CustomTable columns={columns} data={data || []} />
    </div>
  )
}

export default Page
