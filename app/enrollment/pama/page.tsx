/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { columns } from '../otz/columns'
import SelectPatientDialog from '../_components/SelectPatientDialog'
import { useGetAllPAMAEnrollmentsQuery } from '@/api/enrollment/pamaEnrollment.api'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
import { useCallback } from 'react'

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

interface Patient {
  id: string
  firstName: string
}

const OTZ = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPAMAEnrollmentsQuery()

  const { data: patientData } = useGetAllEligibleOTZPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return (
      patientData?.map((item: Patient) => ({
        id: item.id,
        label: item.firstName
      })) || []
    )
  }, [patientData])

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-between items-center w-full p-2 bg-white mt-2">
        <p className=" text-slate-700 font-bold">Patients Enrolled in PAMA</p>

        <SelectPatientDialog
          label="Create New OTZ"
          link="/enrollment/enroll-pama"
          data={patientDataOptions()}
        />
      </div>

      <div className='w-full p-2' >
        <div className="p-4 bg-white rounded-lg">
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </>
  )
}

export default OTZ
