/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useMemo, useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns, type AppointmentProps } from '@/app/appointments/columns'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { useSearchParams } from 'next/navigation'

const AppointmentHomepage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  const [value, setValue] = useState<string | null>(tab)

  // const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  const { data } = useGetAllAppointmentsQuery({
    mode: 'weekly',
    date: '2022-01-01'
  })

  const sortedAppointment: AppointmentProps[] = data ? [...data] : []
  sortedAppointment.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const missedAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Missed'.toLowerCase())
    )
  }, [data])

  //
  const pendingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Pending'.toLowerCase())
    )
  }, [data])

  console.log(missedAppointment(), 'kolp')

  const upcomingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Upcoming'.toLowerCase())
    )
  }, [data])

  const rescheduledAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Rescheduled'.toLowerCase())
    )
  }, [data])

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'All'
      },
      {
        id: 2,
        label: 'Pending'
      },
      {
        id: 3,
        label: 'Rescheduled'
      },
      {
        id: 4,
        label: 'Upcoming'
      },
      {
        id: 5,
        label: 'Missed'
      }
    ],
    []
  )
  return (
    <div>
      <div className="w-full">
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />
          <div className="bg-white rounded-lg p-4">

        {value === 'all' && (
            <CustomTable columns={columns} data={sortedAppointment || []} />
        )}

        {/*  */}
              {value === 'pending' && (
        <CustomTable columns={columns} data={pendingAppointment() || []} />
              )}

      {value === 'rescheduled' && (
        <CustomTable columns={columns} data={rescheduledAppointment() || []} />
      )}

      {value === 'upcoming' && (
        <CustomTable columns={columns} data={upcomingAppointment() || []} />
      )}

      {value === 'missed' && (
        <CustomTable columns={columns} data={missedAppointment() || []} />
      )}
          </div>

      </div>

    </div>
  )
}

export default AppointmentHomepage
