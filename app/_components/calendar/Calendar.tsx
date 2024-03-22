/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-new */
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

interface Event {
  title: string
  start?: Date | string
  allDay?: boolean
  id: number
}

interface CalendarProps {
  data: []
}

const getStatusColor = (status: any) => {
  switch (status) {
    case 'Pending':
      return 'orange'
    default: return 'blue'
  }
}

const eventRender = (event: any) => {
  return <div className={`fc-content bg-${getStatusColor(event.status)}-500 h-12 bg-teal-900`}>
    {event.title}
  </div>
}

const Calendar = ({ data }: CalendarProps) => {
  const events = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id,
      title: item.appointmentAgenda?.agendaDescription,
      date: item.appointmentDate,
      allDay: false,
      status: item.appointmentStatus?.statusDescription
    }))
  }, [data])

  console.log(events(), 'fgh')

  const [allEvents, setAllEvents] = useState<Event[]>([])

  const [newEvents, setNewEvents] = useState([
    {
      id: 0,
      title: 'Today',
      start: moment(),
      allDay: false
    }
  ])

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
  return (
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
        events={events()}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        // eventContent={eventRender}
      />
    </div>
  )
}

export default Calendar
