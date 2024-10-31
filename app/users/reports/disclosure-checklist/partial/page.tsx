'use client'

import { useGetAllChildCaregiverReadinessQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import CustomTab from '@/components/tab/CustomTab'
import React, { useState } from 'react'
import { columns, disclosureColumn } from './columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllDisclosureEligibilityQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
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
    label: 'Patients',
    link: '/'
  }
]

const PartialPage = () => {
  const [tabValue, setTabValue] = useState('child/caregiver readiness')

  const { data } = useGetAllChildCaregiverReadinessQuery()

  const { data: disclosureData } = useGetAllDisclosureEligibilityQuery()
  console.log(disclosureData)

  const categoryListData = [
    {
      id: 2,
      label: 'Disclosure Eligibility',
      count: disclosureData?.length
    },
    {
      id: 1,
      label: 'Child/Caregiver Readiness',
      count: data?.length
    }
  ]

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="mt-2 mb-2 p-4 bg-white">
        <p className="font-bold text-slate-800 text-[14px] ">
          Partial Disclosure
        </p>
        <p className="text-slate-500 text-[12px] ">
          A summary List of all the patients undergoing partial disclosure
        </p>
      </div>

      <CustomTab
        categoryList={categoryListData}
        setValue={setTabValue}
        value={tabValue}
      />
      <div className="p-2">
        <div className="p-2 rounded-lg bg-white">
          {tabValue === 'child/caregiver readiness' && (
            <>
              <div className="mb-2">
                <p className="font-bold text-[14px]">Child/Caregiver Readiness</p>
                <p className="text-[12px] text-slate-500 ">
                  A list of clients whose status needs disclosing.
                </p>
              </div>
              <CustomTable
                columns={columns}
                data={data ?? []}
                // isLoading={isLoading}
                // filter={<FilterComponent />}
                isSearch={false}
              />
            </>
          )}
          {tabValue === 'disclosure eligibility' && (
            <>
              <div className="mb-2">
                <p className="font-bold text-[14px]">Disclosure Eligibility</p>
                <p className="text-[12px] text-slate-500 ">
                  Refers to a list of patients between the ages 6 and 10
                </p>
              </div>
              <CustomTable
                columns={disclosureColumn}
                data={disclosureData ?? []}
                // isLoading={isLoading}
                // filter={<FilterComponent />}
                isSearch={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartialPage
