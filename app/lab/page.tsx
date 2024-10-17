/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
// import { CustomTable } from '../_components/table/CustomTable'
import { useGetAllInternalLabRequestsQuery } from '@/api/viraload/internalLabRequest.api'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'

const LabPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllInternalLabRequestsQuery()

  return (
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">
          Lab Requests
        </p>

        <CustomTable columns={columns} data={data || []} />
      </div>
  )
}

export default LabPage
