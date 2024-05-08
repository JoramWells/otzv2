/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-new */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import { Calendar, CalendarDays, Clock2, X } from 'lucide-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

import { Suspense, useState } from 'react'
import { Divider } from '@chakra-ui/react'
import moment from 'moment'
import EditAppointmentDialog from '../../appointment/EditAppointmentDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import CustomSelect from '../../../../components/forms/CustomSelect'
import CustomInput from '../../../../components/forms/CustomInput'
import { useSearchParams } from 'next/navigation'

interface AppointmentCardsProps {
  item: {
    id: string
    AppointmentStatus: {
      statusDescription: string
    }
    AppointmentAgenda: {
      agendaDescription: string
    }
    User: {
      firstName: string
      middleName: string
    }
    appointmentDate: Date
    appointmentTime: string
  }
}

const AppointmentCard = ({ item }: AppointmentCardsProps) => {
  return (
    <div
      key={item.id}
      className="p-4 bg-white
                rounded-lg w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
    >
      <div
        className="flex flex-row space-x-4
              items-center justify-between"
      >
        <div className="flex space-x-4">
          <p className="font-bold text-lg">
            {item.AppointmentAgenda?.agendaDescription}
          </p>
          <Badge variant={'outline'} className={`rounded-full ${item.AppointmentStatus?.statusDescription === 'Rescheduled' && 'bg-teal-50 text-emerald-600 border-teal-200'} `}>
            {item.AppointmentStatus?.statusDescription}
          </Badge>
        </div>
        <X
          size={25}
          className="bg-slate-100 p-1 rounded-lg hover:cursor-pointer hover:bg-slate-200"
        />
      </div>
      <div className="mb-2 mt-2">
        <p className="text-slate-500 text-sm">
          Requested By: {item.User?.firstName} {item.User?.middleName}
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
          <p className="font-semibold text-slate-500 text-sm">
            {' '}
            {moment(item.appointmentDate).format('ll')}{' '}
          </p>
        </div>
        <Divider orientation="vertical" h={'20px'} />

        {/* clock */}
        <div className="flex flex-row items-center space-x-2">
          <Clock2 size={20} className="text-slate-500" />
          <p className="font-semibold text-slate-500 text-sm">
            {' '}
            {moment(item.appointmentTime, 'HH:mm').format('HH:mm a')}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

interface AppointmentHeaderProps {
  query: string
  setQuery: (val: string) => void
  status: string
  setStatus: (val: string) => void
  reason: string
  setReason: (val: string) => void
}

const AppointmentHeader = ({ query, setQuery, status, setStatus, reason, setReason }: AppointmentHeaderProps) => {
  return (
    <div className="flex flex-row items-center w-1/2 mb-4 space-x-4 justify-between">
      <div className="w-1/4">
        <CustomInput placeholder="Search" value={query} onChange={setQuery} />
      </div>
      <div className="flex flex-row items-center space-x-2">
        <CustomSelect
          placeholder="Completed"
          value={status}
          onChange={setStatus}
          data={[
            { id: 'Completed', label: 'Completed' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Upcoming', label: 'Upcoming' }
          ]}
        />
        <CustomSelect placeholder="Clinic Day"
        value={reason}
        onChange={setReason}
        data={[]}
         />
      </div>
    </div>
  )
}

export interface AppointmentTabProps {
  patientID: string
}

const AppointmentTab = ({ patientID }: AppointmentTabProps) => {
  // const dynamicKey = router.query.id
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams).get('tab')

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [reason, setReason] = useState('')
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const { data, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useGetAppointmentDetailQuery(patientID)

  console.log(data)

  return (
    <Suspense fallback={<Skeleton className="w-full h-[500px]" />} key={params}>
      <div className="w-full flex flex-col items-center">
        {/* header */}

        {data?.length > 0 ? (
          <>
            <div className="flex flex-row justify-between mb-4 items-center w-full lg:w-1/2">
              <p className="text-lg font-bold">Recent Appointments</p>

              {/* right navbar */}
              <div className="flex flex-row items-center justify-between gap-x-4">
                <CalendarDays
                  size={25}
                  onClick={() => {
                    setIsCalendarVisible(!isCalendarVisible)
                  }}
                  className={`hover:cursor-pointer bg-gray-100 h-8 w-8 p-2 rounded-md ${
                    isCalendarVisible &&
                    'bg-teal-600 text-white border border-slate-200'
                  }`}
                />
                <EditAppointmentDialog patientID={patientID} />
              </div>
            </div>

            <AppointmentHeader
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
              reason={reason}
              setReason={setReason}
            />

            {!isCalendarVisible ? (
              <div className="flex flex-col space-y-4 w-full items-center">
                {isLoadingAppointment ? (
                  <>
                    {[1, 2, 3].map((_, idx) => (
                      <Skeleton
                        key={idx}
                        className="border border-slate-200 p-4
                rounded-lg w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 h-[130px] "
                      />
                    ))}
                  </>
                ) : isErrorAppointment ? (
                  <div>Error</div>
                ) : (
                  <>
                    {data?.map((item: any) => (
                      <AppointmentCard key={item.id} item={item} />
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-x-4 w-full items-center">
                {/*  */}
                <div
                  className="overflow-y-auto rounded-lg border-t-8 pt-4 border-t-slate-300"
                  style={{
                    // height: '500px',
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
          </>
        ) : (
          <div
            className="w-1/2 border border-teal-200
          bg-teal-50
          rounded-lg p-4"
          >
            <h1
            className='text-xl text-teal-500 font-bold mb-2'
            >
              Create New Patient Appointment.
            </h1>
            <p className=" text-slate-500 mb-2">
              This patient has no appointments. Learn More about appointments by
              adding a new appointment.
            </p>
            <EditAppointmentDialog patientID={patientID} />
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default AppointmentTab
