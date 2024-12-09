/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns } from '@/app/appointments/columns'
import { useGetAllAppointmentsQuery, type ExtendedAppointmentInputProps } from '@/api/appointment/appointment.api.'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { Badge } from '@/components/ui/badge'
import { useUserContext } from '@/context/UserContext'
import useSearch from '@/hooks/useSearch'
export interface AppointmentResponseInterface {
  data: ExtendedAppointmentInputProps[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

const AppointmentHomepage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  // const agenda = searchParams.get('agenda')
  const [responseData, setResponseData] = useState<ExtendedAppointmentInputProps[] | undefined>([])
  const [total, setTotal] = useState<number | undefined>(0)
  const page = searchParams.get('page')
  const [search, setSearch] = useState('')
  const [value, setValue] = useState<string | null>(tab)
  const [agendaValue, setAgenda] = useState<string | null>()
  const [pageSize, setPageSize] = useState(1)
  const { hospitalID, authUser } = useUserContext()

  const { data, isLoading } = useGetAllAppointmentsQuery({
    mode: 'all',
    date: '2022-01-01',
    hospitalID: (authUser?.role !== 'admin') ? hospitalID as string : '',
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search,
    status: value as string,
    agenda: agendaValue
  },
  {
    skip: !hospitalID && authUser?.role !== 'admin'
  }
  )

  useSearch({ search, setSearch })

  useEffect(() => {
    if (data) {
      setResponseData(data?.data)
      setTotal(data?.total)
    }
  }, [data])

  // const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])

  const sortedAppointment: ExtendedAppointmentInputProps[] = useMemo(
    () => (responseData ? [...responseData] : []),
    [responseData]
  )

  // const memSorted = useCallback(() => {}, [])

  sortedAppointment.sort(
    (a, b) =>
      new Date(b.updatedAt as Date).getTime() -
      new Date(a.updatedAt as Date).getTime()
  )

  const pathname = usePathname()
  const router = useRouter()

  const updateQueryParams = useCallback(
    (newStep: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('tab', newStep)
      router.replace(`${pathname}?${newSearchParams.toString()}`)
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    if (tab === null) {
      updateQueryParams('all')
      setValue('all')
    }
  }, [tab, updateQueryParams])

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
          value={value as string}
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
          value={agendaValue as string}
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
          data={Array.from(
            { length: pageNumber(total!, 10) },
            (_, index) => ({ id: `${index + 1}`, label: `${index + 1}` })
          )}
          placeholder="Page"
        />
      </div>
    )
  }

  return (
    <>
      <div className="w-full p-2">
        <div className="bg-white rounded-lg border border-slate-200">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] capitalize ">
                {value} appointments
              </p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
            {agendaValue && (
              <Badge
                className="hover: cursor-pointer bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-none text-black"
                onClick={() => clearAgenda()}
              >
                {agendaValue}
              </Badge>
            )}
          </div>

          <CustomTable
            columns={columns}
            isLoading={isLoading}
            total={total}
            data={sortedAppointment || []}
            search={search}
            setSearch={setSearch}
            filter={<StatusFilter />}
          />
        </div>
      </div>
    </>
  )
}

export default AppointmentHomepage
