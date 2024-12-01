/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { type UserInterface } from 'otz-types'
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
  const { data } = useGetAllUsersQuery({
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search
  })

  const [userData, setUserData] = useState<UserInterface[]>([])
  const [total, setTotal] = useState(0)

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
        <div className="bg-white p-2 rounded-lg">
          <CustomTable
            columns={columns}
            data={userData ?? []}
            search={search}
            setSearch={setSearch}
            total={total}
          />
        </div>
      </div>
    </>
  )
}

export default Users
