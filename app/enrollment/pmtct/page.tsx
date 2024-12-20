/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllPMTCTProfileEnrollmentsQuery } from '@/api/enrollment/pmtctProfileEnrollment.api'
import { columns } from './columns'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
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

const PMTCT = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPMTCTProfileEnrollmentsQuery()

  // const { data: patientData } = useGetAllPatientsQuery()

  // const patientDataOptions = useCallback(() => {
  //   return (
  //     patientData?.map((item: PatientAttributes) => ({
  //       id: item.id,
  //       label: item.firstName
  //     })) || []
  //   )
  // }, [patientData])

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-end w-full">
        {/* <SelectPatientDialog
          label="Create New PMTCT"
          link="/enrollment/enroll-pmtct"
          data={patientDataOptions()}
        /> */}
      </div>

      <div className="p-4 bg-white rounded-lg mt-4">
        <p className="mb-2 text-lg text-slate-700 font-bold">OTZ Patients</p>
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default PMTCT
