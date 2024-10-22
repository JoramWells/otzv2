/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { columns } from './columns'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

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
    label: 'Facilities',
    link: '/administrator/facilities'
  }
]

const Facilities = () => {
  const router = useRouter()
  const { data, isLoading } = useGetAllHospitalsQuery()
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex justify-between items-center w-full bg-white p-2 mt-2 ">
        <p className="font-semibold">CHAK Facilities <span className='text-slate-500 text-[14px]' >({data?.length})</span> </p>
        <Button
          onClick={() => {
            router.push('/administrator/add-facility')
          }}
          size={'sm'}
        >
          New
        </Button>
      </div>
      <div className="p-2 pt-0">
        <div className="bg-white w-full p-2 rounded-lg mt-2">
          <CustomTable
            isSearch={false}
            columns={columns}
            data={data || []}
            isLoading={isLoading}
            // filter={<FilterComponent />}
            // isSearch
          />
        </div>
      </div>
    </div>
  )
}

export default Facilities
