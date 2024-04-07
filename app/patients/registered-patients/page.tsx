/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Patients = () => {
  // const datax = await getPatients()
  const { data, isLoading } = useGetAllPatientsQuery()
  console.log(data, 'c')
  // otz

  const router = useRouter()

  return (
    <div className="p-5 mt-12">
        <div className="mb-4 flex flex-row justify-between items-center">
          <p className="text-lg font-bold">Registered Patients</p>
          <Button
            className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
            onClick={() => {
              router.push('/patients/add-patients')
            }}
          >
            <PlusCircle size={18} className="mr-2" />
            New Patient
          </Button>
        </div>

        <CustomTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
        />
    </div>
  )
}

export default Patients
