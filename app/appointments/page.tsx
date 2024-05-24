/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../_components/table/CustomTable'
import { type ColumnProps, columns } from './columns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomTab from '../../components/tab/CustomTab'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'
import { PlusCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { AppointmentFilter } from './__components/AppointmentFilter'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
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
    link: ''
  }
]

const AppointmentPage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)

  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  const { data } = useGetAllAppointmentsQuery({
    mode: 'weekly',
    date: '2022-01-01'
  })

  const sortedAppointment: ColumnProps[] = data ? [...data] : []
  sortedAppointment.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const showNotification = useNotification()

  const missedAppointment = useCallback(() => {
    return data?.filter((item: any) => item.appointmentStatus?.statusDescription.toLowerCase().includes('Missed'.toLowerCase()))
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

  useEffect(() => {
    // if (data) {
    // setAppointments(data)
    // }
    const socket: Socket = socketIOClient('http://localhost:5000')

    socket.on('appointment-updated', (socketData: NotificationProps) => {
      showNotification()
      // setAppointments(socketData)
      console.log(socketData)
    })

    // ceck tab
    if (tab === null) {
      params.set('tab', 'all')
      setValue('all')
    }

    return () => {
      socket.disconnect()
    }
  }, [data, showNotification, params, tab])

  console.log(sortedAppointment, 'tyz')

  return (
    <div className="bg-slate-50 ">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between p-4 bg-white mt-2">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <Button
          className="bg-teal-600 hover:bg-teal-700 shadow-none
          font-bold
          "
        >
          <PlusCircle size={18} className="mr-2" />
          New Appointment
        </Button>
      </div>

      {/* tab navigation */}
      <div className="w-full p-4 flex flex-col space-y-2">
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />

        {value === 'all' && (
          <div className="bg-white rounded-lg p-4">
            <AppointmentFilter />
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

export default AppointmentPage
