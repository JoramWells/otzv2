/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
// import { CustomTable } from '@/app/_components/table/CustomTable'
import { appointmentStatusColumns, columns } from './columns'
import { useEffect, useState } from 'react'
// import { Button, Tag } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import AddAppointmentAgenda from './_components/AddAppointmentAgenda'
import AddAppointmentStatus from './_components/AddAppointmentStatus'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import socketIOClient, { type Socket } from 'socket.io-client'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const categoryList = [
  {
    id: 1,
    text: 'Agenda'
  },
  {
    id: 2,
    text: 'Status'
  }
]

const Appointment = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(1)
  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()
  console.log(appointmentStatusData, 'dtc')

  const breadCrumbList = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'Appointment',
      link: 'appointment'
    }
  ]

  useEffect(() => {
    // if (data) {
    // setAppointments(data)
    // }

    const socket: Socket = socketIOClient(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment`, {
      path: '/api/appointment/socket.io',
      transports: ['websocket']
    }
    )

    socket.on('appointment-agenda-updated', (socketData: any) => {
      // showNotification()
      // setAppointments(socketData)
      console.log(socketData)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <BreadcrumbComponent dataList={breadCrumbList} />
      <div
        className="gap-x-4 flex flex-row mt-2 mb-2 bg-white p-2 rounded-lg
          "
      >
        {categoryList.map((item) => (
          <Button
            key={item.id}
            className={`shadow-none rounded-full bg-slate-100 text-slate-500 hover:bg-teal-100
              ${value === item.id && 'bg-teal-50 text-teal-600'}
              `}
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.text}
          </Button>
        ))}
      </div>
      <div className="w-full p-2">
        {value === 1 && (
          <div className="w-full flex items-start space-x-4">
            <div className="w-3/4 bg-white p-2 rounded-lg">
              <p className="mb-2 text-lg font-bold text-slate-700">
                Manage Appointment Agenda
              </p>
              <CustomTable
                columns={columns}
                data={appointmentAgendaData || []}
                isSearch={false}
              />
            </div>
            <AddAppointmentAgenda />
          </div>
        )}

        {value === 2 && (
          <div className="w-full flex items-start space-x-4">
            <div className="w-3/4 bg-white p-2 rounded-lg">
              <p className="mb-2 text-lg font-bold text-slate-700">
                Manage Appointment Status
              </p>
              <CustomTable
                columns={appointmentStatusColumns}
                data={appointmentStatusData || []}
                isSearch={false}
              />
            </div>
            <AddAppointmentStatus />
          </div>
        )}
      </div>
    </>
  )
}

export default Appointment
