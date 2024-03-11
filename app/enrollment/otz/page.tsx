/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { columns } from './columns'
import { CustomTable } from '@/app/_components/table/CustomTable'

const OTZ = () => {
  // const datax = await getPatients()
  const { data } = useGetAllOTZEnrollmentsQuery()
  console.log(data, 'dtc')

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl text-slate-700">
          OTZ Patients
        </p>
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default OTZ
