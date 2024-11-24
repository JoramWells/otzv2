/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns } from '@/app/appointments/columns'
import { type ExtendedAppointmentInputProps } from '@/api/appointment/appointment.api.'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useUserContext } from '@/context/UserContext'
import debounce from 'lodash/debounce'
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
  const [loading, setLoading] = useState(false)
  const [responseData, setResponseData] = useState<ExtendedAppointmentInputProps[] | undefined>([])
  const [total, setTotal] = useState<number | undefined>(0)
  const page = searchParams.get('page')
  const [search, setSearch] = useState('')
  const [value, setValue] = useState<string | null>(tab)

  const { authUser } = useUserContext()

  async function fetchAppointmentData (
    hospitalID: string | undefined,
    page: number,
    pageSize: number,
    searchQuery: string | undefined
  ): Promise<AppointmentResponseInterface | undefined> {
    try {
      setLoading(true)
      const { data } = await axios.get<
      AppointmentResponseInterface | undefined
      >(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/appointments/fetchAll/`,
        {
          params: {
            hospitalID,
            mode: 'all',
            date: '2022-01-01'
            // page,
            // pageSize,
            // searchQuery
          }
        }
      )
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    return debounce(async (value: string) => {
      const data = await fetchAppointmentData(
        authUser?.hospitalID,
        parseInt(page as string, 10),
        10,
        value
      )
      setResponseData(data?.data)
      setTotal(data?.total)
    }, 500)
  }, [authUser?.hospitalID, page])
  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])

  useEffect(() => {
    (async () => {
      if (page && authUser?.hospitalID) {
        const data = await fetchAppointmentData(
          authUser?.hospitalID,
          parseInt(page, 10),
          10,
          ''
        )
        setResponseData(data?.data)
        setTotal(data?.total)
      }
    })()
  }, [authUser?.hospitalID, page, searchParams])

  // const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  // const { data, isLoading: loading } = useGetAllAppointmentsQuery(
  //   {
  //     mode: 'all',
  //     date: '2022-01-01',
  //     hospitalID: user?.hospitalID as string
  //   }
  // )

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

  const missedAppointment = useCallback(() => {
    return sortedAppointment?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Missed'.toLowerCase())
    )
  }, [sortedAppointment])

  //
  const rescheduledAppointment = useCallback(() => {
    return sortedAppointment?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Rescheduled'.toLowerCase())
    )
  }, [sortedAppointment])

  //
  const completedAppointment = useCallback(() => {
    return sortedAppointment?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Completed'.toLowerCase())
    )
  }, [sortedAppointment])

  //
  const pendingAppointment = useCallback(() => {
    return responseData?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Pending'.toLowerCase())
    )
  }, [responseData])

  const upcomingAppointment = useCallback(() => {
    return sortedAppointment?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Upcoming'.toLowerCase())
    )
  }, [sortedAppointment])

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'All',
        count: total
      },
      {
        id: 2,
        label: 'Completed',
        count: completedAppointment()?.length
      },
      {
        id: 6,
        label: 'Pending',
        count: pendingAppointment()?.length
      },
      {
        id: 3,
        label: 'Rescheduled',
        count: rescheduledAppointment()?.length
      },
      {
        id: 4,
        label: 'Upcoming',
        count: upcomingAppointment()?.length
      },
      {
        id: 5,
        label: 'Missed',
        count: missedAppointment()?.length
      }
    ],
    [completedAppointment, missedAppointment, pendingAppointment, rescheduledAppointment, total, upcomingAppointment]
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

  console.log(responseData, 'responseData!!')

  return (
    <>
      <div className="mt-2 w-full">
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />
      </div>
      <div className="w-full p-2">
        <div className="bg-white rounded-lg">
          <div className="p-4 pb-0">
            <p className="capitalize text-slate-700 text-[16px] ">
              {value} appointments
            </p>
          </div>

          {value === 'all' && (
            <CustomTable
              columns={columns}
              isLoading={loading}
              data={sortedAppointment || []}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}

          {/*  */}
          {value === 'completed' && (
            <CustomTable
              columns={columns}
              isLoading={loading}
              data={completedAppointment() || []}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}

          {/*  */}
          {value === 'pending' && (
            <CustomTable
              columns={columns}
              isLoading={loading}
              data={pendingAppointment() ?? []}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}

          {value === 'rescheduled' && (
            <CustomTable
              isLoading={loading}
              columns={columns}
              data={rescheduledAppointment() || []}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}

          {value === 'upcoming' && (
            <CustomTable
              columns={columns}
              data={upcomingAppointment() || []}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}

          {value === 'missed' && (
            <CustomTable
              isLoading={loading}
              columns={columns}
              data={missedAppointment() || []}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default AppointmentHomepage
