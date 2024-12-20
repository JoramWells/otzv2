/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

// import { AppointmentFilter } from './__components/AppointmentFilter'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { XIcon } from 'lucide-react'
import PageTableContainer from '@/app/_components/table/PageTableContainer'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useSearch from '@/hooks/useSearch'
import { useUserContext } from '@/context/UserContext'
import { columns } from './columns'
import usePreprocessData from '@/hooks/usePreprocessData'
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
    label: 'Dashboard',
    link: '/appointments/dashboard'
  },
  {
    id: '3',
    label: 'Appointments',
    link: ''
  }
]

const AppointmentPage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const page = searchParams.get('page')
  const [search, setSearch] = useState('')
  const [appointmentStatus, setStatus] = useState<string | null>(tab)
  const [agendaValue, setAgenda] = useState<string | null>()
  const [pageSize, setPageSize] = useState(1)
  const { hospitalID, authUser } = useUserContext()

  const { data: appointmentData, isLoading } = useGetAllAppointmentsQuery(
    {
      mode: 'all',
      date: '2022-01-01',
      hospitalID: authUser?.role !== 'admin' ? (hospitalID!) : '',
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search,
      status: appointmentStatus!,
      agenda: agendaValue
    },
    {
      skip: !hospitalID && authUser?.role !== 'admin'
    }
  )

  useSearch({ search, setSearch })

  const { data: responseData, total } = usePreprocessData(appointmentData)

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
      setStatus('all')
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

  const clearStatus = () => {
    setStatus('')
    params.set('status', '')
    router.replace(`${pathname}?${params.toString()}`)
  }

  function StatusFilter () {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <CustomSelectParams
          label="Status"
          onChange={setStatus}
          paramValue="tab"
          value={appointmentStatus!}
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
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <PageTableContainer
        title={`${appointmentStatus} appointments`}
        columns={columns}
        isLoading={isLoading}
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        total={total as number}
        data={responseData || []}
        search={search}
        setSearch={setSearch}
        filter={<StatusFilter />}
        rightLabel={
          <>
            {appointmentStatus && (
              <Badge
                className="hover: cursor-pointer flex flex-row space-x-1 capitalize bg-purple-50 border-purple-200 text-purple-500 rounded-full border shadow-none hover:bg-purple-50"
                onClick={() => clearStatus()}
              >
                <XIcon size={12} />
                <p>{appointmentStatus}</p>
              </Badge>
            )}
            {agendaValue && (
              <Badge
                className="hover: cursor-pointer flex flex-row space-x-1 capitalize bg-purple-50 border-purple-200 text-purple-500 rounded-full border shadow-none hover:bg-purple-50"
                onClick={() => clearAgenda()}
              >
                <XIcon size={12} />
                <p>{agendaValue}</p>
              </Badge>
            )}
          </>
        }
      />
    </>
  )
}

export default AppointmentPage
