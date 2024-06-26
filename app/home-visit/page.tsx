/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllHomeVisitsQuery } from '@/api/homevisit/homeVisit.api'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
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

  const { data: patientData } = useGetAllEligibleOTZPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return (patientData?.map((item: Patient) => ({
      id: item.id,
      label: item.firstName
    })) || []
    )
  }, [patientData])

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between items-center bg-white p-2 pl-4 pr-4 mt-2">
        <div>
          <p className="font-bold text-slate-700">Home Visit</p>
          <p className="text-slate-500 text-[14px] ">
            Manage Patients Home Visit
          </p>
        </div>

        <SelectPatientDialog
          label="New Home Visit"
          link="/home-visit/add-home-visit"
          data={patientDataOptions()}
        />
      </div>
      {/*  */}
      <div className='w-full p-4'>
        <div className="flex justify-end w-full p-4 bg-white rounded-lg">
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </>
  )
}

export default HomeVisitPage
