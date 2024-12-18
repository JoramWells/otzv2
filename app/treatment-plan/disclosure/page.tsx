/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

import CustomTab from '@/components/tab/CustomTab'
import Partial from '../_components/Partial'
import Full from '../_components/Full'

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
    label: 'dashboard',
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'Disclosure',
    link: ''
  }
]

const DisclosurePage = () => {
  const [tab, setTab] = useState('full disclosure')

  useEffect(() => {
    setTab('full disclosure')
  }, [])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div
      className='mt-2'
      >
        <CustomTab
          setValue={setTab}
          value={tab}
          categoryList={[
            {
              id: 1,
              label: 'Full Disclosure'
            },
            {
              id: 2,
              label: 'Partial Disclosure'
            }
          ]}
        />
      </div>
      {/* {tab} */}
      <div className="p-2">
        {tab === 'Full Disclosure'.toLowerCase() && <Full />}

        {/*  */}
        {tab === 'Partial Disclosure'.toLowerCase() && <Partial />}
      </div>
      {/*  */}
      {/* <CustomTable columns={partialDisclosureColumn} data={fullData?.data ?? []} /> */}
    </div>
  )
}

export default DisclosurePage
