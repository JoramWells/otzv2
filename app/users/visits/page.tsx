/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { type ExtendedPatientVisitsInterface, useGetAllPatientVisitsQuery } from '@/api/patient/patientVisits.api'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { patientVisitColumns } from './column'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/UserContext'
import { Badge } from '@/components/ui/badge'

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

const PageVisits = () => {
  // const datax = await getPatients()

  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()
  const [patientData, setPatientData] = useState<
  ExtendedPatientVisitsInterface[] | undefined
  >([])
  const [patientTotal, setPatientTotal] = useState<number>(0)
  const page = searchParams.get('page')
  const tab = searchParams.get('tab')

  const [tabValue, setTabValue] = useState(tab)

  const debounceSearch = useMemo(() => {
    // setSearch(value)
    if (page !== null) {
      return debounce(async (value: string) => {
        setSearch(value)
      }, 500)
    }
  }, [page])

  const { authUser, hospitalID } = useUserContext()

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])

  const { data, isLoading } = useGetAllPatientVisitsQuery(
    {
      hospitalID: authUser?.role !== 'admin' ? (hospitalID!) : '',
      page: Number(page) ?? 1,
      pageSize: 5,
      searchQuery: search
    },
    {
      skip: !hospitalID && !tabValue && tabValue === tab
    }
  )

  useEffect(() => {
    if (data) {
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }
    // if (tab === null) {
    //   setTabValue("All");
    // }
  }, [data, tab])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white border rounded-lg">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg"
          >
            <p className="text-slate-700 text-[16px] ">Patient Visits</p>
            <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
              {patientTotal}
            </Badge>
          </div>
          <CustomTable
            columns={patientVisitColumns}
            data={patientData ?? []}
            total={patientTotal}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            // filter={<AgeFilter />}

            // isSearch
          />
        </div>
      </div>
    </div>
  )
}

export default PageVisits
