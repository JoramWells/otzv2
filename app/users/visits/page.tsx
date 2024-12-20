/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllPatientVisitsQuery } from '@/api/patient/patientVisits.api'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { patientVisitColumns } from './column'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/UserContext'
import usePreprocessData from '@/hooks/usePreprocessData'
import PageTableContainer from '@/app/_components/table/PageTableContainer'
import useSearch from '@/hooks/useSearch'

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
    label: 'Dashboard',
    link: '/users/dashboard'
  },
  {
    id: '3',
    label: 'Visits',
    link: ''
  }
]

const PageVisits = () => {
  // const datax = await getPatients()

  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  const { authUser, hospitalID } = useUserContext()

  const { data: patientVisitData, isLoading } = useGetAllPatientVisitsQuery(
    {
      hospitalID: authUser?.role !== 'admin' ? (hospitalID!) : '',
      page: Number(page) ?? 1,
      pageSize: 5,
      searchQuery: search
    },
    {
      skip: !hospitalID
    }
  )

  const { data, total } = usePreprocessData(patientVisitData)
  useSearch({ search, setSearch })

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <PageTableContainer
        title="Patient Visits"
        columns={patientVisitColumns}
        data={data ?? []}
        total={total as number}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        // filter={<AgeFilter />}

        // isSearch
      />
    </>
  )
}

export default PageVisits
