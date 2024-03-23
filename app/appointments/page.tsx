/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AppointmentStatusTab from '../_components/appointment/tabs/AppointmentStatusTab'
import { Button } from '@/components/ui/button'
import CustomTab from '../_components/tab/CustomTab'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([])
  const [value, setValue] = useState<number>(1)
  const { data } = useGetAllAppointmentsQuery()

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

  const pendingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Pending'.toLowerCase())
    )
  }, [data])

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: `All ${data?.length}`
      },
      {
        id: 2,
        label: `Pending ${pendingAppointment()?.length}`
      },
      {
        id: 3,
        label: `Rescheduled ${rescheduledAppointment()?.length}`
      },
      {
        id: 4,
        label: `Upcoming ${upcomingAppointment()?.length}`
      },
      {
        id: 5,
        label: `Missed ${missedAppointment()?.length}`
      }
    ],
    [missedAppointment, data?.length, pendingAppointment, rescheduledAppointment, upcomingAppointment]
  )

  useEffect(() => {
    const socket: Socket = socketIOClient('http://localhost:5000')

    socket.on('appointment-updated', (socketData: NotificationProps) => {
      showNotification()
    })

    return () => {
      socket.disconnect()
    }
  }, [showNotification])

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">
          Patient Appointment
        </p>

        {/* tab navigation */}
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />

        {value === 1 && <CustomTable columns={columns} data={data || []} />}

        {value === 2 && (
          <AppointmentStatusTab
            columns={columns}
            data={pendingAppointment() || []}
          />
        )}

        {value === 3 && (
          <CustomTable
            columns={columns}
            data={rescheduledAppointment() || []}
          />
        )}

        {value === 4 && (
          <CustomTable columns={columns} data={upcomingAppointment() || []} />
        )}

        {value === 5 && (
          <CustomTable columns={columns} data={missedAppointment() || []} />
        )}
      </div>
    </div>
  )
}

export default AppointmentPage
