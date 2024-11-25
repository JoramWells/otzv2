/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
// import { useGetAllPrescriptionsQuery } from '@/api/pillbox/artPrescription.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { type ExtendedPrescriptionInterface, useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
import CustomTab from '@/components/tab/CustomTab'
import { useEffect, useMemo, useState } from 'react'
import { calculateAge } from '@/utils/calculateAge'
import { useSession } from 'next-auth/react'
import { type UserInterface } from 'otz-types'
import axios from 'axios'
import debounce from 'lodash/debounce'
import { useSearchParams } from 'next/navigation'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

export interface PrescriptionResponseInterface {
  data: ExtendedPrescriptionInterface[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: '/prescription'
  }
]

const PrescriptionPage = () => {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number | undefined>(0)
  const [search, setSearch] = useState('')
  const [responseData, setResponseData] = useState<
  ExtendedPrescriptionInterface[] | undefined
  >()

  const { data, isLoading } = useGetAllPrescriptionsQuery({
    mode: undefined,
    hospitalID: user?.hospitalID as string,
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search
  })
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    if (page != null) {
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
    if (data != null) {
      setResponseData(data.data)
      setTotal(data.total)
    }
  }, [data])

  let sortedData = responseData ? [...responseData] : []
  sortedData = sortedData.filter(item => calculateAge(item.Patient.dob) < 25)
  sortedData.sort(
    (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
  )

  // active prescriptions
  const activeData = sortedData?.filter(item => item.expectedNoOfPills && item.expectedNoOfPills > 0)
  const nonActive = sortedData?.filter(item => item.expectedNoOfPills && item.expectedNoOfPills < 0)

  const [tabValue, setTabValue] = useState('all')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg p-4">
          <p className="font-semibold">
            Current Prescriptions{' '}
            <span className="text-slate-500 text-[14px] ">
              ({total})
            </span>
          </p>
          <CustomTab
            value={tabValue}
            setValue={setTabValue}
            categoryList={[
              {
                id: 1,
                label: 'All',
                count: sortedData?.length
              },
              {
                id: 2,
                label: 'Active',
                count: activeData?.length
              },
              {
                id: 3,
                label: 'Not Active',
                count: nonActive?.length
              }
            ]}
          />
          <div className="mb-2" />
          {tabValue === 'all' && (
            <CustomTable
              columns={columns}
              data={responseData ?? []}
              total={total}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
            />
          )}
          {tabValue === 'active' && (
            <CustomTable
              columns={columns}
              data={activeData || []}
              total={total}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
            />
          )}
          {tabValue === 'not active' && (
            <CustomTable
              columns={columns}
              data={nonActive || []}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
