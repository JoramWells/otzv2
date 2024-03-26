/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetMmasQuery } from '@/api/treatmentplan/mmas.api'
import { CustomTable } from '../table/CustomTable'
import { columns } from './columns'
import { useGetAllHomeVisitsQuery, useGetHomeVisitQuery } from '@/api/homevisit/homeVisit.api'

export interface HomeVisitProps {
  patientID: string
}

const HomeVisitTab = ({ patientID }: HomeVisitProps) => {
  const { data } = useGetMmasQuery(patientID)
  console.log(data, 'dtc')

  return (
    <div className="mt-4 w-full">
      <CustomTable columns={columns} data={data || []} />
    </div>
  )
}

export default HomeVisitTab
