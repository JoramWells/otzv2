/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-new */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../table/CustomTable'
import { columns } from './columns'
import { Calendar, CalendarDays, Clock2, Trash2 } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

import { useEffect, useState } from 'react'
import { Button, Center, Divider, Tag } from '@chakra-ui/react'
import Link from 'next/link'
import moment from 'moment'

export interface AppointmentTabProps {
  patientID: string
}

interface Event {
  title: string
  start?: Date | string
  allDay?: boolean
  id: number
}

const AppointmentTab = ({ patientID }: AppointmentTabProps) => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Support Group'
    },
    {
      id: '2',
      title: 'Refill'
    },
    {
      id: '3',
      title: 'Home visit'
    },
    {
      id: '4',
      title: 'Viral Load'
    }
  ])

  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    title: '',
    start: '',
    allDay: false
  })

  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          const title = eventEl.innerText
          const id = eventEl.dataset.id
          // const start = eventEl.getAttribute('start')
          return { title, id }
        }
      })
    }
  }, [])

  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const { data } = useGetAppointmentDetailQuery(patientID)
  console.log(data, 'dtc')

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* header */}
      <div className="flex flex-row justify-between mb-4 items-center w-full">
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
          <Button size={'sm'} colorScheme="green" variant={'outline'}>
            <Link href={`/appointments/add-appointment/${patientID}`}>NEW</Link>
          </Button>
        </div>
      </div>

      {!isCalendarVisible ? (
        <>
          {data?.map((item: any) => (
            <div
              key={item.id}
              className="border border-slate-200 p-4
                rounded-lg w-3/4"
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
        </>
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
              events={events}
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
