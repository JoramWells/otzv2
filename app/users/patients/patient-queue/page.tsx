/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientVisitsQuery } from '@/api/patient/patientVisits.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { patientVisitColumns } from '../_components/columns'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[36px] rounded-lg" />
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

const PatientQueue = () => {
  const router = useRouter()
  const { data } = useGetAllPatientVisitsQuery()
  console.log(data)
  return (
    <div className='p-2' >
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex flex-row justify-between items-center bg-white p-2 pl-4 pr-4 mt-2">
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
          New Appointment
        </Button>
      </div>

      <div
      className='p-4 bg-white rounded-lg'
      >
        <CustomTable
        data={data || []}
        columns={patientVisitColumns}
        />
      </div>
    </div>
  )
}

export default PatientQueue
