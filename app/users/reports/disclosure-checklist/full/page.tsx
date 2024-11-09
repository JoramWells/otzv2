'use client'

import CustomTab from '@/components/tab/CustomTab'
import React, { Suspense, useState } from 'react'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllExecuteDisclosureQuery } from '@/api/treatmentplan/full/executeDisclosure.api'
import { useGetAllPostDisclosureQuery } from '@/api/treatmentplan/full/postDisclosure.api'
import { executeDisclosureColumn, postDisclosureColumns } from './columns'

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

const FullPage = () => {
  const [tabValue, setTabValue] = useState('execute disclosure')

  const { data } = useGetAllPostDisclosureQuery()

  const { data: executeDisclosureData } = useGetAllExecuteDisclosureQuery()
  console.log(executeDisclosureData)

  const categoryListData = [
    {
      id: 2,
      label: 'Execute Disclosure',
      count: executeDisclosureData?.length
    },
    {
      id: 1,
      label: 'Post Disclosure',
      count: data?.length
    }
  ]

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="mt-2 mb-2 p-4 bg-white">
        <p className="font-bold text-slate-800 text-[14px] ">Full Disclosure</p>
        <p className="text-slate-500 text-[12px] ">
          A summary List of all the patients undergoing full disclosure
        </p>
      </div>

      <CustomTab
        categoryList={categoryListData}
        setValue={setTabValue}
        value={tabValue}
      />
      <div className="p-2">
        <div className="p-2 rounded-lg bg-white">
          {tabValue === 'execute disclosure' && (
            <>
              <div className="mb-2">
                <p className="font-bold text-[14px]">Execute Disclosure</p>
                <p className="text-[12px] text-slate-500 ">
                  A complete list of patient undergoing the full disclosure test.
                </p>
              </div>
              <CustomTable
                columns={executeDisclosureColumn}
                data={executeDisclosureData ?? []}
                // isLoading={isLoading}
                // filter={<FilterComponent />}
                isSearch={false}
              />
            </>
          )}
          {tabValue === 'post disclosure' && (
            <>
              <div className="mb-2">
                <p className="font-bold text-[14px]">Post Disclosure</p>
                <p className="text-[12px] text-slate-500 ">
                  A set of assessment for complete patient disclosure.
                </p>
              </div>
              <CustomTable
                columns={postDisclosureColumns}
                data={data ?? []}
                // isLoading={isLoading}
                // filter={<FilterComponent />}
                isSearch={false}
              />
            </>
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default FullPage
