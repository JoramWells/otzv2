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
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'

const AppointmentTab = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const { data } = useGetAllAppointmentsQuery()
  console.log(data, 'dtc')

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-end mb-2">
        <CalendarDays
          onClick={() => {
            setIsCalendarVisible(!isCalendarVisible)
          }}
          className={`hover:cursor-pointer bg-gray-100 h-9 w-9 p-2 rounded-md ${isCalendarVisible && 'bg-teal-600 text-white'}`}
        />
      </div>

      {!isCalendarVisible
        ? (
        <CustomTable columns={columns} data={data || []} />
          )
        : (
        <div
        className='flex flex-row justify-center'
        >
          <div
            className=""
            style={{
              minHeight: '400px',
              minWidth: '65%'
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              // headerToolbar={{
              //   left: 'prev.next today',
              //   center: 'title',
              //   right: 'resourceTimelineWeek, dayGridMonth, timeGridWeek'
              // }}
              events={[]}
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
