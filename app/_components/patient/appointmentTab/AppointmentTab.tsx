/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-new */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import { Calendar, CalendarDays, Clock2, Trash2 } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

import { useState } from 'react'
import { Button, Divider, Tag } from '@chakra-ui/react'
import Link from 'next/link'
import moment from 'moment'
import EditAppointmentDialog from '../../appointment/EditAppointmentDialog'

export interface AppointmentTabProps {
  patientID: string
}

const AppointmentTab = ({ patientID }: AppointmentTabProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const { data } = useGetAppointmentDetailQuery(patientID, {
    type: 'patient'
  })
  console.log(data, 'dtc')

  return (
    <div className="w-full flex flex-col">
      {/* header */}
      <div className="flex flex-row justify-between mb-4 items-center w-full lg:w-3/4">
        <p className="text-lg font-bold">Recent Appointments</p>

        {/* right navbar */}
        <div className="flex flex-row items-center justify-between gap-x-4">
          <CalendarDays
            size={25}
            onClick={() => {
              setIsCalendarVisible(!isCalendarVisible)
            }}
            className={`hover:cursor-pointer bg-gray-100 h-8 w-8 p-2 rounded-md ${
              isCalendarVisible && 'bg-teal-600 text-white'
            }`}
          />
          <EditAppointmentDialog patientID={patientID} />
          <Button size={'sm'} colorScheme="green" variant={'outline'}>
            <Link href={`/notify/add-appointment/${patientID}`}>NEW</Link>
          </Button>
        </div>
      </div>

      {!isCalendarVisible ? (
        <div
        className='flex flex-col space-y-4'
        >
          {data?.map((item: any) => (
            <div
              key={item.id}
              className="border border-slate-200 p-4
                rounded-lg w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4"
            >
              <div
                className="flex flex-row space-x-4
              items-center justify-between"
              >
                <div className="flex space-x-4">
                  <p className="font-bold text-lg">
                    {item.appointmentAgenda?.agendaDescription}
                  </p>
                  <Tag variant={'outline'} rounded={'full'} size={'sm'}>
                    {item.appointmentStatus?.statusDescription}
                  </Tag>
                </div>
                <Trash2 size={25} className="bg-slate-200 p-1 rounded-lg" />
              </div>
              <div className="mb-2 mt-2">
                <p className="text-slate-500 text-sm">
                  Requested By: {item.user?.firstName} {item.user?.middleName}
                </p>
              </div>
              <Divider />
              <div
                className="mt-4
              flex flex-row items-center space-x-4
              "
              >
                <div className="flex flex-row items-center space-x-2">
                  <Calendar size={20} className="text-slate-500" />
                  <p className="font-bold text-slate-500 text-sm">
                    {' '}
                    {moment(item.appointmentDate).format('ll')}{' '}
                  </p>
                </div>
                <Divider orientation="vertical" h={'20px'} />

                {/* clock */}
                <div className="flex flex-row items-center space-x-2">
                  <Clock2 size={20} className="text-slate-500" />
                  <p className="font-bold text-slate-500 text-sm">
                    {' '}
                    {moment(item.appointmentTime, 'HH:mm').format('HH:mm a')}{' '}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row gap-x-4 w-full justify-center">
          {/*  */}
          <div
            className="overflow-y-auto rounded-lg border-t-8 pt-4 border-t-slate-300"
            style={{
              minHeight: '400px',
              minWidth: '75%'
            }}
          >
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                multiMonthPlugin
              ]}
              headerToolbar={{
                // center: 'title',
                left: 'multiMonthYear, dayGridMonth ,timeGridWeek',
                right: 'prev,next,today'
              }}
              // events={events}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
            />
          </div>

        </div>
      )}
    </div>
  )
}

export default AppointmentTab
