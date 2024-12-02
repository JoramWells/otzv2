/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
// import { useGetAllPrescriptionsQuery } from '@/api/pillbox/artPrescription.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { type ExtendedPrescriptionInterface, useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { useSearchParams } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'
import CustomSelectParams from '@/components/forms/CustomSelectParams'

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
  const { authUser } = useUserContext()

  const page = searchParams.get('page')
  const [pageSize, setPageSize] = useState(1)

  const [total, setTotal] = useState<number | undefined>(0)
  const [search, setSearch] = useState('')
  const [responseData, setResponseData] = useState<
  ExtendedPrescriptionInterface[] | undefined
  >()
  const [regimenLine, setRegimenLine] = useState('')
  const [regimen, setRegimen] = useState('')
  const [status, setStatus] = useState('')
  const [frequency, setFrequency] = useState('')

  const { data, isLoading } = useGetAllPrescriptionsQuery({
    mode: undefined,
    hospitalID: authUser?.hospitalID as string,
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search,
    frequency,
    line: regimenLine,
    regimen,
    status
  },
  {
    skip: !authUser?.hospitalID
  }
  )

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    if (page != null) {
      return debounce(async (value: string) => {
        setSearch(value)
      }, 300)
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

  const pageNumber = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize)
  }
  function StatusFilter () {
    return (
      <div className="flex flex-row space-x-2 items-center">
        {/*  */}
        <CustomSelectParams
          label="Frequency"
          onChange={setFrequency}
          paramValue="frequency"
          value={frequency}
          data={[
            {
              id: 'once',
              label: 'Once'
            },
            {
              id: 'twice',
              label: 'Twice'
            }
          ]}
          placeholder="Frequency"
        />
        {/*  */}
        <CustomSelectParams
          label="Regimen Line"
          onChange={setRegimenLine}
          paramValue="line"
          value={regimenLine}
          data={[
            {
              id: 'first line',
              label: 'First Line'
            },
            {
              id: 'second line',
              label: 'Second Line'
            },
            {
              id: 'third line',
              label: 'Third Line'
            }
          ]}
          placeholder="Line"
        />

        {/*  */}
        <CustomSelectParams
          label="Regimen"
          onChange={setRegimen}
          paramValue="regimen"
          value={regimen}
          data={[
            {
              id: 'first line',
              label: 'First Line'
            }
          ]}
          placeholder="Regimen"
        />

        {/*  */}
        <CustomSelectParams
          label="Status"
          onChange={setStatus}
          paramValue="status"
          value={status}
          data={[
            {
              id: 'active',
              label: 'Active'
            },
            {
              id: 'not active',
              label: 'Not Active'
            }
          ]}
          placeholder="Status"
        />

        {/*  */}
        <CustomSelectParams
          label={`Page No :- ${pageNumber(total!, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from({ length: pageNumber(total!, 10) }, (_, index) => ({
            id: `${index + 1}`,
            label: `${index + 1}`
          }))}
          placeholder="Page"
        />
      </div>
    )
  }

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

          <div className="mb-2" />
            <CustomTable
              columns={columns}
              data={responseData ?? []}
              total={total}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
              filter={<StatusFilter/>}
            />

        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
