/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns } from '@/app/appointments/columns'
import { type ExtendedAppointmentInputProps, useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { calculateAge } from '@/utils/calculateAge'
import { type UserInterface } from 'otz-types'
import { useSession } from 'next-auth/react'

const AppointmentHomepage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [user, setUser] = useState<UserInterface>()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])

  const [value, setValue] = useState<string | null>(tab)

  // const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  const { data } = useGetAllAppointmentsQuery({
    mode: 'all',
    date: '2022-01-01',
    hospitalID: user?.hospitalID as string
  })

  let sortedAppointment: ExtendedAppointmentInputProps[] = useMemo(
    () => (data ? [...data] : []),
    [data]
  )

  // const memSorted = useCallback(() => {}, [])

  sortedAppointment.sort(
    (a, b) => new Date(b.updatedAt as Date).getTime() - new Date(a.updatedAt as Date).getTime()
  )

  sortedAppointment = sortedAppointment.filter(item => calculateAge(item.Patient.dob) < 25)

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

  console.log(sortedAppointment, 'appointment')

  //
  const pendingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Pending'.toLowerCase())
    )
  }, [data])

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
        count: sortedAppointment?.length
      },
      {
        id: 2,
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
    [missedAppointment, pendingAppointment, rescheduledAppointment, sortedAppointment?.length, upcomingAppointment]
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
          <div className="bg-white rounded-lg p-4">

          <h4
          className='capitalize mb-2 font-bold '
          >
            {value} appointments
          </h4>

            {value === 'all' && (
              <CustomTable columns={columns} data={sortedAppointment || []} />
            )}

            {/*  */}
            {value === 'pending' && (
              <CustomTable
                columns={columns}
                data={pendingAppointment() ?? []}
              />
            )}

            {value === 'rescheduled' && (
              <CustomTable
                columns={columns}
                data={rescheduledAppointment() || []}
              />
            )}

            {value === 'upcoming' && (
              <CustomTable
                columns={columns}
                data={upcomingAppointment() || []}
              />
            )}

            {value === 'missed' && (
              <CustomTable columns={columns} data={missedAppointment() || []} />
            )}
          </div>
        </div>
      </>

  )
}

export default AppointmentHomepage
