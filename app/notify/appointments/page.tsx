/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomTab from '../../_components/tab/CustomTab'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'
import { PlusCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const AppointmentPage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data } = useGetAllAppointmentsQuery({
    mode: 'weekly',
    date: new Date().toISOString()
  })

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

    return () => {
      socket.disconnect()
    }
  }, [data, showNotification])

  console.log(data, 'ty')

  return (
    <div className="p-5 mt-12">
      <div className="flex flex-row mb-4 justify-between ">
        <h1 className="text-lg font-semibold">Appointments</h1>

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
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      {value === 'all' && <CustomTable columns={columns} data={data || []} />}

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
