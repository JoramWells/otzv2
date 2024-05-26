/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CustomTab from '@/components/tab/CustomTab'
import React, { useCallback, useMemo, useState } from 'react'
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
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Missed'.toLowerCase())
    )
  }, [data])

  const upcomingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Upcoming'.toLowerCase())
    )
  }, [data])

  const rescheduledAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
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
        label: 'Upcoming '
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
      <div className="w-full p-4 flex flex-col space-y-2">
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />

        {value === 'all' && (
          <div className="bg-white rounded-lg p-4">
            {/* <AppointmentFilter /> */}
            <CustomTable columns={columns} data={sortedAppointment || []} />
          </div>
        )}
      </div>

      {/* {value === 2 && (
        <AppointmentStatusTab
          columns={columns}
          data={pendingAppointment() || []}
        />
      )} */}

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
  )
}

export default AppointmentHomepage
