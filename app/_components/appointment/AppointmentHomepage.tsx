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
    mode: 'weekly',
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
        label: 'All'
      },
      {
        id: 2,
        label: 'Pending'
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

  const availableDays = [
    {
      id: 1,
      label: 'Available'
    },
    {
      id: 2,
      label: 'Unavailable'
    }
  ]

  const [available, setAvailableDays] = useState(1)

  return (
    <div>
      <div className="mt-1 p-2 bg-white mb-1">
        <h2>Appointments</h2>
      </div>

      <div className="flex items-center space-x-4 p-2">
        {availableDays.map?.((item, i) => (
          <div key={item.id} onClick={() => { setAvailableDays(item.id) }}>
            {item.label}
          </div>
        ))}
      </div>

      <hr />

      {available === 1 && (
        <>
          <CustomTab
            categoryList={categoryList}
            setValue={setValue}
            value={value}
          />
          <div className="w-full p-4">
            <div className="bg-white rounded-lg p-4">
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

              {value === 'upcoming' && (
                <CustomTable
                  columns={columns}
                  data={upcomingAppointment() || []}
                />
              )}

              {value === 'missed' && (
                <CustomTable
                  columns={columns}
                  data={missedAppointment() || []}
                />
              )}
            </div>
          </div>
        </>
      )}

      {/*  */}
      {available === 2 && <div>unavailable</div>}
    </div>
  )
}

export default AppointmentHomepage
