/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { Badge } from '@/components/ui/badge'

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
  const pathname = usePathname()
  const router = useRouter()
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
        {/* <CustomSelectParams
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
        /> */}

        {/*  */}
        {/* <CustomSelectParams
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
        /> */}

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

  const params = new URLSearchParams(searchParams.toString())
  const clearStatus = () => {
    setStatus('')
    params.set('status', '')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg border border-slate-200">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] capitalize ">{status} Prescriptions</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
            {status && (
              <Badge
                className="hover: cursor-pointer bg-purple-50 border rounded-full text-[12px] border-purple-200 hover:bg-purple-100 capitalize shadow-none text-purple-500"
                onClick={() => clearStatus()}
              >
                {status}
              </Badge>
            )}
          </div>

          <CustomTable
            columns={columns}
            data={responseData ?? []}
            total={total}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            filter={<StatusFilter />}
          />
        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
