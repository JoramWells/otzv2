/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { useSearchParams } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { type PatientAttributes } from 'otz-types'
import { calculateAge } from '@/utils/calculateAge'
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

const TreatmentPlanPage = () => {
  const [patientData, setPatientData] = useState<
  PatientAttributes[] | undefined
  >([])

  const [patientTotal, setPatientTotal] = useState<number | undefined>(0)

  const searchParams = useSearchParams()

  const { authUser } = useUserContext()

  const page = searchParams.get('page')

  const { data, isLoading } = useGetAllPatientsQuery(
    {
      hospitalID: authUser?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: '',
      calHIVQuery: 'all'
    },
    {
      skip: (authUser?.hospitalID) == null
    }
  )

  const filterData = patientData?.filter(item => calculateAge(item.dob) > 5 && calculateAge(item.dob) < 14)

  //
  useEffect(() => {
    if (data != null) {
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }
  }, [data])

  console.log(data)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div
        className='bg-white rounded-lg'
        >
          <CustomTable
            columns={columns}
            data={filterData ?? []}
            total={filterData?.length}
            isLoading={isLoading}
            // search={search}
            // setSearch={setSearch}
            // filter={<FilterComponent />}
            // isSearch
          />
        </div>
      </div>
    </div>
  )
}

export default TreatmentPlanPage
