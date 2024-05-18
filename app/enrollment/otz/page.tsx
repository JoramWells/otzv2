/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { columns } from './columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'
import { useState } from 'react'

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
    link: 'enrollments'
  }
]

const tabList = [
  {
    id: 1,
    label: 'Pediatric'
  },
  {
    id: 2,
    label: 'OTZ'
  },
  {
    id: 3,
    label: 'OTZ Plus'
  },
  {
    id: 4,
    label: 'Adults'
  }
]

const OTZ = () => {
  // const datax = await getPatients()
  const [tab, setTab] = useState('otz')
  const { data } = useGetAllOTZEnrollmentsQuery()

  return (
      <div className="p-2">
        <BreadcrumbComponent dataList={dataList2} />

        <div className="w-full mt-4">
          <CustomTab value={tab} setValue={setTab} categoryList={tabList} />
        </div>

        <div className="p-4 bg-white rounded-lg mt-4">
          <p className="mb-2 text-lg text-slate-700 font-bold">OTZ Patients</p>
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
  )
}

export default OTZ
