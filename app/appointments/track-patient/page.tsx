/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { type ExtendedAppointmentInputProps, useGetStarredPatientAppointmentsQuery } from '@/api/appointment/appointment.api.'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useMemo, useState } from 'react'
import { columns } from '../columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Badge } from '@/components/ui/badge'
import debounce from 'lodash/debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Appointments',
    link: '/appointments/appointments'
  }
]
const TrackPatientPage = () => {
  const searchParams = useSearchParams()
  const [agendaValue, setAgenda] = useState<string | null>()
  const tab = searchParams.get('tab')

  const [value, setValue] = useState<string | null>(tab)
  const pathname = usePathname()

  const [responseData, setResponseData] = useState<
  ExtendedAppointmentInputProps[] | undefined
  >([])
  const [total, setTotal] = useState<number | undefined>(0)
  const [pageSize, setPageSize] = useState(1)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const page = searchParams.get('page')

  const { authUser } = useUserContext()
  const { data, isLoading } = useGetStarredPatientAppointmentsQuery(
    {
      hospitalID: authUser?.hospitalID as unknown as string,
      page: 1,
      pageSize: 10,
      searchQuery: search,
      status: 'all'
    },
    {
      skip: authUser?.hospitalID == null
    }
  )

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    if (page != null) {
      return debounce(async (value: string) => {
        setSearch(value)
      }, 500)
    }
  }, [page])

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])

  useEffect(() => {
    if (data != null) {
      setResponseData(data.data)
      setTotal(data.total)
    }
  }, [data])

  //
  //
  const pageNumber = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize)
  }

  const params = new URLSearchParams(searchParams.toString())
  const clearAgenda = () => {
    setAgenda('')
    params.set('agenda', '')
    router.replace(`${pathname}?${params.toString()}`)
  }

  function StatusFilter () {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <CustomSelectParams
          label="Status"
          onChange={setValue}
          paramValue="tab"
          value={value!}
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
        />

        {/*  */}
        <CustomSelectParams
          label="Agenda"
          onChange={setAgenda}
          paramValue="agenda"
          value={agendaValue!}
          data={[
            {
              id: 'clinic visit',
              label: 'Clinic Visit'
            },
            {
              id: 'home visit',
              label: 'Home Visit'
            },
            {
              id: 'refill',
              label: 'Refill'
            },
            {
              id: 'viral load',
              label: 'Viral Load'
            }
          ]}
          placeholder="Agenda"
        />

        {/*  */}
        <CustomSelectParams
          label={`Page No :- ${pageNumber(total!, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from({ length: pageNumber(total!, 10) }, (_, index) => ({
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

      {/*  */}
      <div className="p-2">
        <div className=" border border-slate-200 bg-white rounded-lg">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] ">
                Starred Appointments
              </p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
            {/* {caseManager && (
              <Badge
                className="hover: cursor-pointer bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-none text-black"
                onClick={() => clearCaseManager()}
              >
                {caseManager}
              </Badge>
            )} */}
          </div>
          <CustomTable
            columns={columns}
            isLoading={isLoading}
            total={total}
            data={responseData ?? []}
            search={search}
            setSearch={setSearch}
            filter={<StatusFilter />}
          />
        </div>
      </div>
    </div>
  )
}

export default TrackPatientPage
