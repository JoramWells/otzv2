/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../_components/table/CustomTable'
import { columns, type PatientProps } from './columns'
import { useGetAllInternalLabRequestsQuery } from '@/api/viraload/internalLabRequest.api'

const LabPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllInternalLabRequestsQuery()
  console.log(data, 'dtc')

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">
          Lab Requests
        </p>

        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default LabPage
