'use client'

import { useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import React from 'react'
import { columns } from './columns'

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

const ReportPage = () => {
  const { data } = useGetAllPrescriptionsQuery({
    mode: 'all'
  })
  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg p-2">
          <p className=' mb-2 font-semibold' >
            All Prescriptions
            <span
            className='text-slate-500 text-[14px] '
            > ({data?.length})</span>
          </p>
          <CustomTable columns={columns} data={data ?? []} />
        </div>
      </div>
    </>
  )
}

export default ReportPage
