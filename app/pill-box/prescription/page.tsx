/* eslint-disable @typescript-eslint/no-floating-promises */
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

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])

  async function fetchPatientData (
    hospitalID: string | undefined,
    page: number,
    pageSize: number,
    searchQuery: string | undefined
  ): Promise<PrescriptionResponseInterface | undefined> {
    try {
      setLoading(true)
      const { data } = await axios.get<
      PrescriptionResponseInterface | undefined
      >(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/otz-enrollment/fetchAll`,
          {
            params: {
              hospitalID,
              page,
              pageSize,
              searchQuery
            }
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
        user?.hospitalID,
        parseInt(page as string, 10),
        10,
        value
      )
      setResponseData(data?.data)
      setTotal(data?.total)
    }, 500)
  }, [page, user?.hospitalID])
  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])

  useEffect(() => {
    (async () => {
      if (page && user?.hospitalID) {
        const data = await fetchPatientData(
          user?.hospitalID,
          parseInt(page, 10),
          10,
          ''
        )
        setResponseData(data?.data)
        setTotal(data?.total)
      }
    })()
  }, [page, searchParams, user?.hospitalID])

  // const { data } = useGetAllPrescriptionsQuery({
  //   mode: undefined,
  //   hospitalID: user?.hospitalID as string
  // })

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
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}
          {tabValue === 'active' && (
            <CustomTable
              columns={columns}
              data={activeData || []}
              total={total}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}
          {tabValue === 'not active' && (
            <CustomTable
              columns={columns}
              data={nonActive || []}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
