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
  console.log(data, 'data')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div
        className='flex justify-end w-full'
        >
          <Button
            onClick={() => {
              router.push('/administrator/add-facility')
            }}
            size={'sm'}
          >
            New
          </Button>
        </div>
        <div className="bg-white w-full p-4 rounded-lg mt-2">
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
