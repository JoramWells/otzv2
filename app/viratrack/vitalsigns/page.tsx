'use client'

import { type ExtendedVitalSignsInterface, useGetAllVitalSignsQuery } from '@/api/lab/vitalSigns.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

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
    label: 'Dashboard',
    link: '/'
  }
]

const VitalSignsPage = () => {
  const { authUser } = useUserContext()
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [vlData, setVLData] = useState<ExtendedVitalSignsInterface[]>([])
  const { data, isLoading } = useGetAllVitalSignsQuery({
    hospitalID: authUser?.hospitalID,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  },
  {
    skip: (authUser?.hospitalID) == null
  }
  )

  useEffect(() => {
    if (data != null) {
      setVLData(data.data)
      setTotal(data.total)
    }
  }, [data])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div
      className='p-2'
      >
        <div
        className='bg-white border border-slate-200 rounded-lg'
        >
          <CustomTable
            columns={columns}
            isLoading={isLoading}
            data={vlData ?? []}
            total={total}
            search={search}
            setSearch={setSearch}
            // filter={<AgeFilter />}
          />
        </div>
      </div>
    </div>
  )
}

export default VitalSignsPage
