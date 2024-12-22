/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/UserContext'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import CustomTab from '@/components/tab/CustomTab'
import TransferOut from './_components/TransferOut'
import TransferIn from './_components/TransferIn'
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
    link: ''
  }
]

const TransfersPage = () => {
  // const [pageSize, setPageSize] = useState(1)

  const { authUser } = useUserContext()

  const [tabValue, setTabValue] = useState('transfer in')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="mt-2">
        <CustomTab
          setValue={setTabValue}
          value={tabValue}
          categoryList={[
            {
              id: 1,
              label: 'Transfer In'
            },
            {
              id: 2,
              label: 'Transfer Out'
            }
          ]}
        />
      </div>
      {tabValue === 'transfer in' && (
        <TransferIn hospitalID={authUser?.hospitalID as string}
        userID={authUser?.id as string}
        />
      )}

      {tabValue === 'transfer out' && (
        <TransferOut hospitalID={authUser?.hospitalID as string} />
      )}
    </div>
  )
}

export default TransfersPage
