/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useMemo, useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns } from '@/app/appointments/columns'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { useSearchParams } from 'next/navigation'

const AppointmentHomepage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const [value, setValue] = useState<string | null>(tab)

  // const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  const { data } = useGetAllAppointmentsQuery({
    mode: 'all',
    date: '2022-01-01'
  })

  const sortedAppointment: AppointmentProps[] = useMemo(() => (data ? [...data] : []), [data])

  // const memSorted = useCallback(() => {}, [])

  sortedAppointment.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
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

  // const availableDays = [
  //   {
  //     id: 1,
  //     label: 'Available'
  //   },
  //   {
  //     id: 2,
  //     label: 'Unavailable'
  //   }
  // ]

  // const [available, setAvailableDays] = useState(1)

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

          <h2
          className='capitalize mb-2 font-bold text-slate-700 '
          >
            {value} appointments
          </h2>

            {value === 'all' && (
              <CustomTable columns={columns} data={sortedAppointment || []} />
            )}

            {/*  */}
            {value === 'pending' && (
              <CustomTable
                columns={columns}
                data={pendingAppointment() || []}
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
