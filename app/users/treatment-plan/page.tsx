/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import React, { useEffect, useMemo, useState } from 'react'
import { columns } from './columns'
import { useGetAllEligibleOTZPatientsQuery, useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { useSearchParams } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { type PatientAttributes } from 'otz-types'
import debounce from 'lodash/debounce'
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

const TreatmentPlanPage = () => {
  const [patientData, setPatientData] = useState<
  PatientAttributes[] | undefined
  >([])

  const [patientTotal, setPatientTotal] = useState<number | undefined>(0)

  const searchParams = useSearchParams()

  const { authUser } = useUserContext()

  const page = searchParams.get('page')
  const [search, setSearch] = useState('')

  const { data, isLoading } = useGetAllEligibleOTZPatientsQuery(
    {
      hospitalID: authUser?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 5,
      searchQuery: search
    },
    {
      skip: authUser?.hospitalID == null
    }
  )

  const debounceSearch = useMemo(() => {
    // setSearch(value)
    if (page !== null) {
      return debounce(async (value: string) => {
        setSearch(value)
      }, 500)
    }
  }, [page])

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])

  // const filterData = patientData?.filter(item => calculateAge(item.dob) > 5 && calculateAge(item.dob) < 14)

  //
  useEffect(() => {
    if (data != null) {
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }
  }, [data])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 pb-2 pt-2 flex flex-row space-x-2 items-center  rounded-t-lg border-b border-slate-200 bg-slate-50 ">
            <p className="text-slate-700 text-[16px] ">Treatment Plan Overview</p>
            <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
              {patientTotal}
            </Badge>
          </div>
          <CustomTable
            columns={columns}
            data={patientData ?? []}
            total={patientTotal}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            // filter={<FilterComponent />}
            // isSearch
          />
        </div>
      </div>
    </div>
  )
}

export default TreatmentPlanPage
