/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { type ExtendedPartialDisclosureInterface, useGetAllPartialDisclosureQuery } from '@/api/treatmentplan/partial/partialDisclosure.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import { patientColumns } from './columns'

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
  console.log(data)

  useEffect(() => {
    if (data != null) {
      setPartialData(data?.data)
    }
  }, [data])
  return (
    <div>DisclosurePage

<CustomTable
columns={patientColumns}
data={partialData ?? []}
/>

    </div>
  )
}

export default DisclosurePage
