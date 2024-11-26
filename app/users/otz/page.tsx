/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { type ExtendedOTZEnrollment, useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useUserContext } from '@/context/UserContext'
import { columns } from './columns'
import { Badge } from '@/components/ui/badge'
import debounce from 'lodash/debounce'
import { useSearchParams } from 'next/navigation'
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
  const [total, setTotal] = useState<number | undefined>(0)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useGetAllOTZEnrollmentsQuery(
    {
      hospitalID: authUser?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search,
    },
    {
      skip: !authUser?.hospitalID,
    }
  )

  const [responseData, setResponseData] = useState<ExtendedOTZEnrollment[] | undefined>()

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

  useEffect(() => {
    if (data) {
      setResponseData(data?.data)
      setTotal(data?.total)
    }
  }, [data, page, searchParams])

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
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default OTZ
