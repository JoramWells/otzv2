/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../table/CustomTable'
import { columns } from './columns'
import { useGetAllHomeVisitsQuery } from '@/api/homevisit/homeVisit.api'

const HomeVisitTab = () => {
  const { data } = useGetAllHomeVisitsQuery()
  console.log(data, 'dtc')

  return (
    <div className="mt-4">
      <CustomTable columns={columns} data={data || []} />
    </div>
  )
}

export default HomeVisitTab
