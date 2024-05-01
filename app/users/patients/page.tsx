/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Patients = () => {
  // const datax = await getPatients()
  const { data, isLoading } = useGetAllPatientsQuery()
  // otz

  const router = useRouter()

  return (
    <div className="p-5 mt-12">
        <div className="mb-4 flex flex-row justify-between items-center">
          <p className="text-xl font-bold text-slate-700">Registered Patients</p>
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

        <Suspense
        fallback={<Skeleton className='w-full' />}
        >

              <CustomTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
        />
          </Suspense>

    </div>
  )
}

export default Patients