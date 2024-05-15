/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { patientColumns } from './_components/columns'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[36px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
  }
]

const Patients = () => {
  // const datax = await getPatients()
  const { data, isLoading } = useGetAllPatientsQuery()
  // otz

  // console.log(data, 'dtx')

  const router = useRouter()

  return (
    <div className="w-full p-2">
      <BreadcrumbComponent dataList={dataList2} />
      {/* <div className="flex flex-row justify-between items-center bg-white p-2 pl-4 pr-4 mt-2">
        <p className="text-[14px] font-bold text-slate-700">
          Manage Registered Patients
        </p>
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
      </div> */}

      <Suspense fallback={<Skeleton className="w-full" />}>

          <div className="bg-white w-full p-4 rounded-lg mt-4">
            <CustomTable
              columns={patientColumns}
              data={data || []}
              isLoading={isLoading}
              // isSearch
            />
          </div>
      </Suspense>
    </div>
  )
}

export default Patients