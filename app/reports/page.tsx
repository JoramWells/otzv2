/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../_components/table/CustomTable'
import { useGetAllHomeVisitsQuery } from '@/api/homevisit/homeVisit.api'
import { columns } from './columns'

const Patients = () => {
  // const datax = await getPatients()
  const { data } = useGetAllHomeVisitsQuery()
  console.log(data, 'dtc')

  return (
      <div className="p-5">
        <p className='mb-4 text-xl font-semibold text-slate-700'>Home Visit</p>
        {/* <CustomTable columns={columns} data={data ?? []} /> */}
      </div>
  )
}

export default Patients
