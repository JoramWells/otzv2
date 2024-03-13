/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../table/CustomTable'
import { columns } from './columns'

const AppointmentTab = () => {
  const { data } = useGetAllAppointmentsQuery()
  console.log(data, 'dtc')

  return (
      <div className="mt-4">
        <CustomTable columns={columns} data={data || []} />
      </div>
  )
}

export default AppointmentTab
