'use client'

import { useGetAllChildCaregiverReadinessQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import CustomTab from '@/components/tab/CustomTab'
import React, { useState } from 'react'
import { columns } from './columns'
import { CustomTable } from '@/app/_components/table/CustomTable'

const categoryListData = [
  {
    id: 1,
    label: 'Child Caregiver readiness'
  },
  {
    id: 2,
    label: 'Disclosure Eligibility'
  }
]

const PartialPage = () => {
  const [tabValue, setTabValue] = useState('mmas')

  const { data } = useGetAllChildCaregiverReadinessQuery()
  console.log(data)

  return (
    <div>
      <CustomTab
        categoryList={categoryListData}
        setValue={setTabValue}
        value={tabValue}
      />
      <div>
        <div>
          <CustomTable
            columns={columns}
            data={data ?? []}
            // isLoading={isLoading}
            // filter={<FilterComponent />}
            isSearch={false}
          />
        </div>
      </div>
    </div>
  )
}

export default PartialPage
