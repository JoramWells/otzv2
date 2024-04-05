/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, type PatientProps } from '../columns'

const Patients = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPatientsQuery()
  console.log(data, 'dtc')

  return (
      <div className="p-5">
        <p className='mb-4 text-xl font-semibold text-slate-700'>Registered Patients</p>
        <CustomTable columns={columns} data={data || []} />
      </div>
  )
}

export default Patients
