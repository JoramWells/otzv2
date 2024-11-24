/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { type ExtendedOTZEnrollment, useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { columns, patientColumns } from './columns'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import debounce from 'lodash/debounce'
import { useSearchParams } from 'next/navigation'
import { type OTZEnrollmentsInterface } from 'otz-types'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
    link: '/enrollments'
  }
]

interface Patient {
  id: string
  firstName: string
}

export interface OTZEnrollmentResponseInterface {
  data: ExtendedOTZEnrollment[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

const OTZ = () => {
  // const datax = await getPatients()
  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  const { authUser } = useUserContext()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number | undefined>(0)
  const [search, setSearch] = useState('')

  const { data } = useGetAllOTZEnrollmentsQuery({
    hospitalID: authUser?.hospitalID as string,
  })

  const [responseData, setResponseData] = useState<ExtendedOTZEnrollment[] | undefined>()

  async function fetchPatientData (
    hospitalID: string | undefined,
    page: number,
    pageSize: number,
    searchQuery: string | undefined
  ): Promise<OTZEnrollmentResponseInterface | undefined> {
    try {
      setLoading(true)
      const { data } = await axios.get<OTZEnrollmentResponseInterface | undefined>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/otz-enrollment/fetchAll`,
        {
          params: {
            hospitalID,
            page,
            pageSize,
            searchQuery,
          },
        }
      )
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    return debounce(async (value: string) => {
      const data = await fetchPatientData(
        authUser?.hospitalID,
        parseInt(page as string, 10),
        10,
        value
      )
      setResponseData(data?.data)
      setTotal(data?.total)
    }, 500)
  }, [authUser?.hospitalID, page])
  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])

  useEffect(() => {
    void (async () => {
      if (page && authUser?.hospitalID) {
        const data = await fetchPatientData(
          authUser?.hospitalID,
          parseInt(page, 10),
          10,
          ''
        )
        setResponseData(data?.data)
        setTotal(data?.total)
      }
    })()
  }, [authUser?.hospitalID, page, searchParams])

  return (
    <Suspense>
      <div className="">
        <BreadcrumbComponent dataList={dataList2} />

        <div className="p-2">
          <div className=" bg-white rounded-lg">
            <div className="flex space-x-2 items-center p-4 pb-0">
              <p className="text-[16px] text-slate-700">OTZ Clients</p>
              <Badge className="bg-slate-200 text-black shadow-none">
                {total}
              </Badge>
            </div>
            <CustomTable
              columns={columns}
              data={responseData ?? []}
              total={total}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default OTZ
