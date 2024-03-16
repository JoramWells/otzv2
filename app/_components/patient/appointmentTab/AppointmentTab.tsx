/* eslint-disable no-new */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../table/CustomTable'
import { columns } from './columns'
import { CalendarDays } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

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
  const { data } = useGetAllAppointmentsQuery()
  console.log(data, 'dtc')

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex flex-row justify-between mb-4 bg-slate-50 p-2 items-center rounded-lg border">
        <p className="text-lg font-semibold text-slate-700">
          Recent Appointments
        </p>

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
        <CustomTable columns={columns} data={data || []} />
      ) : (
        <div className="flex flex-row gap-x-4 w-full justify-between">
          {/*  */}
          <div
            className="overflow-y-auto rounded-lg border-t-8 pt-4 border-t-slate-300"
            style={{
              minHeight: '550px',
              minWidth: '80%'
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

          {/*  */}
          <div
            className="w-72"
            style={{
              height: '200px'
            }}
          >
            <p className='font-bold'>Events</p>
            <p className='text-sm text-gray-500'>Drag event to calendar</p>
            <div id="draggable-el">
              {events.map((item: any) => (
                <div
                  key={item.id}
                  className="fc-event
                  p-2 rounded-lg bg-slate-200
                  hover:cursor-pointer mt-2 mb-2"
                  title={item.title}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentTab
