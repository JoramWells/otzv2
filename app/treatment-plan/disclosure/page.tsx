/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import { partialDisclosureColumn } from './columns'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { type ExtendedDisclosureTracker, useGetAllDisclosureTrackerQuery } from '@/api/treatmentplan/disclosureTracker.api'
import { useSearchParams } from 'next/navigation'
import CustomSelectParams from '@/components/forms/CustomSelectParams'

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
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const { hospitalID } = useUserContext()
  const [partialData, setPartialData] = useState<
  ExtendedDisclosureTracker[]
  >([])
  const [total, setTotal] = useState<number | string | undefined>(0)
  const [hasPartialDisclosure, setHasPartialDisclosure] = useState<boolean | undefined>()
  const [hasFullDisclosure, setHasFullDisclosure] = useState<boolean | undefined>()
  const [pageSize, setPageSize] = useState(1)

  const { data } = useGetAllDisclosureTrackerQuery(
    {
      hospitalID: hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: '',
      hasPartialDisclosure: hasPartialDisclosure!,
      hasFullDisclosure: hasFullDisclosure!
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
      setTotal(data.total)
    }
  }, [data])

  //
  const pageNumber = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize)
  }

  function StatusFilter () {
    return (
      <div className="flex flex-row space-x-2 items-center">
        {/* <CustomSelectParams
          label="Status"
          onChange={setStatus}
          paramValue="tab"
          value={appointmentStatus as string}
          data={[
            {
              id: 'all',
              label: 'All'
            },
            {
              id: 'completed',
              label: 'Completed'
            },
            {
              id: 'missed',
              label: 'Missed'
            },
            {
              id: 'upcoming',
              label: 'Upcoming'
            },
            {
              id: 'pending',
              label: 'Pending'
            },
            {
              id: 'rescheduled',
              label: 'Rescheduled'
            }
          ]}
          placeholder="Status"
        /> */}

        {/*  */}
        <CustomSelectParams
          label="Full Disclosure"
          onChange={setHasFullDisclosure}
          paramValue="hasFullDisclosure"
          value={hasFullDisclosure as unknown as string}
          data={[
            {
              id: 'true',
              label: 'Completed'
            },
            {
              id: 'false',
              label: 'Not Completed'
            }
          ]}
          placeholder="Full Disclosure"
        />

        {/*  */}
        <CustomSelectParams
          label="Partial Disclosure"
          onChange={setHasPartialDisclosure}
          paramValue="hasPartialDisclosure"
          value={hasPartialDisclosure as unknown as string}
          data={[
            {
              id: 'true',
              label: 'Completed'
            },
            {
              id: 'false',
              label: 'Not Completed'
            }
          ]}
          placeholder="Partial Disclosure"
        />

        {/*  */}
        <CustomSelectParams
          label={`Page No :- ${pageNumber(total as number, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from({ length: pageNumber(total as number, 10) }, (_, index) => ({
            id: `${index + 1}`,
            label: `${index + 1}`
          }))}
          placeholder="Page"
        />
      </div>
    )
  }

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div className="bg-white rounded-lg border border-slate-200 ring ring-slate-100">
          <div
            className="p-2 pb-1 pt-1 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] ">Partial Disclosure</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
          </div>
          <CustomTable
            columns={partialDisclosureColumn}
            data={partialData ?? []}
            total={total as number}
            filter={<StatusFilter />}
          />
        </div>
      </div>
      {/*  */}
      {/* <CustomTable columns={partialDisclosureColumn} data={fullData?.data ?? []} /> */}
    </div>
  )
}

export default DisclosurePage
