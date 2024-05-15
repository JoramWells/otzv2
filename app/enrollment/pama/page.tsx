/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { columns } from '../otz/columns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import SelectPatientDialog from '../_components/SelectPatientDialog'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[38px] rounded-none" />
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
    label: 'enrollments',
    link: 'enrollments'
  }
]
const OTZ = () => {
  // const datax = await getPatients()
  const { data } = useGetAllOTZEnrollmentsQuery()

  const router = useRouter()

  return (
    <div className="p-2">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-end w-full">
        <Button
          onClick={() => {
            router.push('/enroll-pama')
          }}
        >
          New PAMA
        </Button>
      </div>

      <SelectPatientDialog />

      <div className="p-4 bg-white rounded-lg mt-4">
        <p className="mb-2 text-lg text-slate-700 font-bold">OTZ Patients</p>
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default OTZ
