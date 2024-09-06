/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import SelectPatientDialog from '../enrollment/_components/SelectPatientDialog'
import { CustomTable } from '../_components/table/CustomTable'
import { configColumns } from './columns'
import { type PatientAttributes } from 'otz-types'
import { useGetAllHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'

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
    link: '/'
  }
]

const HomeVisitPage = () => {
  const { data } = useGetAllHomeVisitConfigQuery()

  const { data: patientData } = useGetAllPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return (patientData?.map((item: PatientAttributes) => ({
      id: item.id,
      label: item.firstName
    })) ?? []
    )
  }, [patientData])

  console.log(data)

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
          link="/home-visit/config"
          data={patientDataOptions()}
        />
      </div>
      {/*  */}
      <div className='w-full p-4'>
        <div className="flex justify-end w-full p-4 bg-white rounded-lg">
          <CustomTable columns={configColumns} data={data ?? []} />
        </div>
      </div>
    </>
  )
}

export default HomeVisitPage
