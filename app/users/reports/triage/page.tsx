/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useGetAllVitalSignsQuery } from '@/api/lab/vitalSigns.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import React from 'react'
import { columns } from './columns'

const Page = () => {
  const { data } = useGetAllVitalSignsQuery()
  console.log(data, 'userData')
  return (
    <div>
      {/* <CustomTable
        columns={columns}
        data={data ?? []}
        // isLoading={isLoading}
        // filter={<FilterComponent />}
        // isSearch
      /> */}
    </div>
  )
}

export default Page
