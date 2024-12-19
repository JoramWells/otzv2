/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'
import { useGetAllMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import React from 'react'
import { columns } from './columns'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Badge } from '@/components/ui/badge'
import usePreprocessData from '@/hooks/usePreprocessData'
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
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'MMAS',
    link: ''
  }
]

const MMASPage = () => {
  const { hospitalID } = useUserContext()
  //   const [] = useState()
  const { data: mmasFour } = useGetAllMmasFourQuery({
    hospitalID: hospitalID as string,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  },
  {
    skip: hospitalID == null
  }
  )

  const { data, total } = usePreprocessData(mmasFour)

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg border border-slate-200 ">
          <div
            className="p-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] ">MMAS</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>

          </div>
          <CustomTable
            columns={columns}
            data={data ?? []}
            total={total as number}
          />
        </div>
      </div>
    </div>
  )
}

export default MMASPage
