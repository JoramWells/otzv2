/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllHomeVisitsQuery } from '@/api/homevisit/homeVisit.api'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import SelectPatientDialog from '../enrollment/_components/SelectPatientDialog'
import { CustomTable } from '../_components/table/CustomTable'
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
    label: 'Patients',
    link: ''
  }
]

interface Patient {
  id: string
  firstName: string
}

const HomeVisitPage = () => {
  const { data } = useGetAllHomeVisitsQuery()
  const router = useRouter()

  const { data: patientData } = useGetAllEligibleOTZPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return (patientData?.map((item: Patient) => ({
      id: item.id,
      label: item.firstName
    })) || []
    )
  }, [patientData])

  console.log(data, 'lop')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between items-center bg-white p-2 pl-4 pr-4 mt-2">
        <div>
          <p className="font-bold text-slate-700">Patients</p>
          <p className="text-slate-500 text-[14px] ">
            Manage Registered Patients
          </p>
        </div>

        <SelectPatientDialog
          label="New Home Visit"
          link="/home-visit/add-home-visit"
          data={patientDataOptions()}
        />
      </div>
      {/*  */}
      <div className="flex justify-end w-full">
        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default HomeVisitPage
