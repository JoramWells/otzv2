'use client'

import { useGetAllVitalSignsQuery } from '@/api/vitalsigns/vitalSigns.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import React, { Suspense } from 'react'
import { columns } from './columns'

const Page = () => {
  const { data } = useGetAllVitalSignsQuery()
  console.log(data, 'userData')
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <CustomTable
        columns={columns}
        data={data ?? []}
        // isLoading={isLoading}
        // filter={<FilterComponent />}
        // isSearch
      />
    </Suspense>
  )
}

export default Page
