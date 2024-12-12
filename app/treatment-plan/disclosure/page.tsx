/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { type ExtendedPartialDisclosureInterface, useGetAllPartialDisclosureQuery } from '@/api/treatmentplan/partial/partialDisclosure.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import { partialDisclosureColumn } from './columns'
import { useGetAllFullDisclosureQuery } from '@/api/treatmentplan/full/fullDisclosure.api.ts'

const DisclosurePage = () => {
  const { hospitalID } = useUserContext()
  const [partialData, setPartialData] = useState<ExtendedPartialDisclosureInterface[]>([])
  const { data } = useGetAllPartialDisclosureQuery({
    hospitalID: hospitalID as string,
    page: 1,
    pageSize: 10,
    searchQuery: ''
  },
  {
    skip: hospitalID == null
  }
  )

  // const { data: fullData } = useGetAllFullDisclosureQuery(
  //   {
  //     hospitalID: hospitalID as string,
  //     page: 1,
  //     pageSize: 10,
  //     searchQuery: ''
  //   },
  //   {
  //     skip: hospitalID == null
  //   }
  // )

  // console.log(fullData)

  useEffect(() => {
    if (data != null) {
      setPartialData(data?.data)
    }
  }, [data])
  return (
    <div>
      DisclosurePage
      <CustomTable columns={partialDisclosureColumn} data={partialData ?? []} />
      {/*  */}
      {/* <CustomTable columns={partialDisclosureColumn} data={fullData?.data ?? []} /> */}
    </div>
  )
}

export default DisclosurePage
