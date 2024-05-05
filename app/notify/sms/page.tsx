/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AppointmentStatusTab from '../../_components/appointment/tabs/AppointmentStatusTab'
import { Button } from '@/components/ui/button'
import CustomTab from '../../../components/tab/CustomTab'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'
import { CircleFadingPlus, PlusCircle } from 'lucide-react'
import { useGetAllSMSQuery } from '@/api/sms/sms.api'
import { useSearchParams } from 'next/navigation'

const SMSPage = () => {
  const [appointments, setAppointments] = useState([])
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data } = useGetAllSMSQuery()

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
        label: 'All'
      },
      {
        id: 2,
        label: 'Rescheduled'
      },
      {
        id: 3,
        label: 'Sent'
      }
    ],
    []
  )

  console.log(data, 'lki')

  // useEffect(() => {
  //   // if (data) {
  //   // setAppointments(data)
  //   // }
  //   const socket: Socket = socketIOClient('http://localhost:5000')

  //   socket.on('appointment-updated', (socketData: NotificationProps) => {
  //     showNotification()
  //     // setAppointments(socketData)
  //     console.log(socketData)
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [data, showNotification])

  return (
    <div className="p-5 mt-12">
      <div className="flex flex-row mb-4 justify-between ">
        <h1 className="text-lg font-semibold">SMS & Whatsapp</h1>

        <Button
          className="bg-teal-600 hover:bg-teal-700 shadow-none
          font-bold
          "
        >
          <PlusCircle size={18} className="mr-2" />
          New Notification
        </Button>
      </div>

      {/* tab navigation */}
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      {value === 'All' && <CustomTable columns={columns} data={data || []} />}

      {value === 'pending' && (
        <AppointmentStatusTab
          columns={columns}
          data={pendingAppointment() || []}
        />
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
  )
}

export default SMSPage
