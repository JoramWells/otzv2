/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { type ExtendedUserInterface, useGetAllUsersQuery } from '@/api/users/users.api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { Badge } from '@/components/ui/badge'
import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'users',
    link: '/'
  }
]

const Users = () => {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(1)
  const [hospitalName, setHospitalName] = useState('')

  const { data } = useGetAllUsersQuery({
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search,
    hospitalName
  })

  const [userData, setUserData] = useState<ExtendedUserInterface[]>([])
  const [total, setTotal] = useState(0)

  const { data: hospitalData } = useGetAllHospitalsQuery()

  const hospitalDataOptions = useCallback(() => {
    return hospitalData?.map(item => ({
      id: item.hospitalName,
      label: item.hospitalName
    }))
  }, [hospitalData])
  const pageNumber = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize)
  }
  function HospitalFilter () {
    return (
        <div className="flex flex-row space-x-2 items-center">
          <CustomSelectParams
            label={`Page No :- ${pageNumber(total, 10)}`}
            paramValue="page"
            onChange={setPageSize}
            value={`${pageSize}`}
            data={Array.from(
              { length: pageNumber(total, 10) },
              (_, index) => ({ id: `${index + 1}`, label: `${index + 1}` })
            )}
            placeholder="Page"
          />
          <CustomSelectParams
            label={`Hospital Name :- ${pageNumber(total, 10)}`}
            paramValue="hospitalName"
            onChange={setHospitalName}
            value={hospitalName}
            data={hospitalDataOptions() ?? []}
            placeholder="Hospital Name"
          />
        </div>
    )
  }

  useEffect(() => {
    if (data) {
      setUserData(data.data)
      setTotal(data.total)
    }
  }, [data])

  //
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

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`${pathname}/add-user`)
  }

  return (
    <>
      <div className="relative">
        <BreadcrumbComponent dataList={dataList} />
        <Button
          size={'sm'}
          className="shadow-none absolute top-2 right-2"
          variant={'outline'}
          onClick={handleClick}
        >
          New
        </Button>
      </div>

      <div className="p-2 ">
        <div className="bg-white rounded-lg border border-slate-200">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] ">Users</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
            {/* {caseManager && ( */}
            <Badge
              className="hover: cursor-pointer bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-none text-black"
              // onClick={() => clearCaseManager()}
            >
              {/* {caseManager} */}l
            </Badge>
            {/* )} */}
          </div>
          <CustomTable
            columns={columns}
            data={userData ?? []}
            search={search}
            setSearch={setSearch}
            total={total}
            filter={<HospitalFilter/>}
          />
        </div>
      </div>
    </>
  )
}

export default Users
