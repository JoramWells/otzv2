/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useGetAllAppModulesQuery } from '@/api/appModules/appModules.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
// import { columns } from './columns'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { columns } from './columns'
import { debounce } from 'lodash'
import { type AppModuleInterface } from 'otz-types'

export interface AppModuleResponseInterface {
  data: AppModuleInterface[]
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
    label: 'Patients',
    link: '/'
  }
]

const AppModulesPage = () => {
  const [responseData, setResponseData] = useState<AppModuleInterface[] | undefined>()
  const [total, setTotal] = useState<number | undefined>(0)
  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()

  const page = searchParams.get('page')

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

  const router = useRouter()
  const { data, isLoading } = useGetAllAppModulesQuery({
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search
  })

  useEffect(() => {
    if (data != null) {
      setResponseData(data.data)
      setTotal(data.total)
    }
  }, [data])

  return (
    <div>
      <div className="relative">
        <BreadcrumbComponent dataList={dataList2} />

        <Button
          className="absolute right-2 top-2"
          size={'sm'}
          onClick={() => {
            router.push('/administrator/app-modules/add')
          }}
        >
          Add
        </Button>
      </div>
      <div className="p-2">
        <div className="bg-white rounded-lg p-4">
          <CustomTable
            columns={columns}
            data={responseData ?? []}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            // debounceSearch={debounceSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default AppModulesPage
