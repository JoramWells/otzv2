/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'

const Patients = () => {
  const { data } = useGetAllAppointmentsQuery()
  console.log(data, 'dtc')

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className='mb-4 text-xl font-semibold text-slate-700'>Patient Appointments</p>
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default Patients
