/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import { partialDisclosureColumn } from '../disclosure/columns'
import { useGetAllPartialDisclosureTrackerQuery } from '@/api/treatmentplan/disclosureTracker.api'
import { useUserContext } from '@/context/UserContext'
import { useSearchParams } from 'next/navigation'
import usePreprocessData from '@/hooks/usePreprocessData'

const Partial = () => {
  const searchParams = useSearchParams()

  const [pageSize, setPageSize] = useState(1)
  const [hasPartialDisclosure, setHasPartialDisclosure] = useState<boolean | undefined>()
  const { hospitalID, authUser } = useUserContext()
  const page = searchParams.get('page')

  const { data: fullData } = useGetAllPartialDisclosureTrackerQuery(
    {
      hospitalID: authUser?.role !== 'admin' ? (hospitalID!) : '',
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: '',
      hasPartialDisclosure,
      hasFullDisclosure: false
    },
    {
      skip: hospitalID == null
    }
  )

  const { data, total } = usePreprocessData(fullData)

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
             label="Status"
             onChange={setHasPartialDisclosure}
             paramValue="hasPartialDisclosure"
             value={hasPartialDisclosure as unknown as string}
             data={[
               {
                 id: 'true',
                 label: 'Began'
               },
               {
                 id: 'false',
                 label: 'Not Began'
               }
             ]}
             placeholder="Status"
           />

        {/*  */}
        <CustomSelectParams
          label={`Page No :- ${pageNumber(total as number, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from(
            { length: pageNumber(total as number, 10) },
            (_, index) => ({
              id: `${index + 1}`,
              label: `${index + 1}`
            })
          )}
          placeholder="Page"
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div
        className="p-2 flex
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
        data={data ?? []}
        total={total as number}
        filter={<StatusFilter />}
      />
    </div>
  )
}

export default Partial
