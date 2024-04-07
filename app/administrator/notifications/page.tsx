/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { appointmentStatusColumns, columns } from './columns'
import { useState } from 'react'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { Button } from '@/components/ui/button'
import NotifyCategory from '@/app/_components/notify/NotifyCategory'
import NotificationType from '@/app/_components/notify/NotifIcationType'
import NotifySubCategory from '@/app/_components/notify/NotifySubCategory'
import NotificationComponent from '@/app/_components/notify/NotificationComponent'

const categoryList = [
  {
    id: 1,
    text: 'Notification Type'
  },
  {
    id: 2,
    text: 'Notification Category'
  },
  {
    id: 3,
    text: 'Sub-Category '
  },
  {
    id: 4,
    text: 'Notifications'
  }
]

const Appointment = () => {
  const [value, setValue] = useState(1)
  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()
  console.log(appointmentStatusData, 'dtc')

  return (
    <div className="p-5 mt-12">
      <p
      className='font-bold text-xl'
      >Notifications Settings</p>
      <div
        className="rounded-md gap-x-4
           flex flex-row mt-4 mb-4
          "
      >
        {categoryList.map((item) => (
          <Button
            key={item.id}
            // bgColor={`${value === item.id && 'gray.700'}`}
            // color={`${value === item.id && 'white'}`}
            // shadow={`${value === item.id && 'md'}`}
            // _hover={{
            //   bgColor: `${value === item.id && 'black'}`,
            //   color: `${value === item.id && 'white'}`
            // }}
            className={`bg-white text-slate-500 rounded-full border
            border-slate-200 shadow-none hover:bg-slate-100 
            ${item.id === value && 'bg-slate-200 font-bold'}
            `}
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.text}
          </Button>
        ))}
      </div>
      {value === 1 && (
        <NotificationType
          columns={columns}
          data={appointmentAgendaData || []}
        />
      )}

      {value === 2 && (
        <NotifyCategory columns={columns} data={appointmentAgendaData || []} />
      )}
      {value === 3 && (
        <NotifySubCategory
          columns={columns}
          data={appointmentAgendaData || []}
        />
      )}

      {value === 4 && (
        <NotificationComponent
          columns={appointmentStatusColumns}
          data={appointmentStatusData || []}
        />
      )}
    </div>
  )
}

export default Appointment
