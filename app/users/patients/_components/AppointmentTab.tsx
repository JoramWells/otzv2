/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-new */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'

import { Suspense } from 'react'
// import EditAppointmentDialog from '../../../_components/appointment/EditAppointmentDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { columns } from '../../columns'

export interface AppointmentTabProps {
  patientID: string
}

const AppointmentTab = ({ patientID }: AppointmentTabProps) => {
  // const dynamicKey = router.query.id
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams).get('tab')

  const { data, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useGetAppointmentDetailQuery(patientID)

  console.log(data)

  return (
    <Suspense fallback={<Skeleton className="w-full h-[500px]" />} key={params}>
      <div className="w-full flex flex-col items-center">
        {/* header */}
        <div className="flex flex-row items-center justify-between bg-white mt-2 w-full">
<p className='text-xl font-bold p-2'>Manage Appointments</p>

          {/* <EditAppointmentDialog patientID={patientID} /> */}
        </div>

        {data?.length > 0 ? (
          <>
            <div className="flex flex-col space-y-4 w-full items-center p-4">
              {isLoadingAppointment ? (
                <Skeleton
                  className="border border-slate-200 p-4
                rounded-lg w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 h-[130px] "
                />
              ) : isErrorAppointment ? (
                <div>Error</div>
              ) : (
                <div className="w-full flex flex-row justify-between space-x-4">
                  <div
                  className='bg-white rounded-lg p-4 w-full'
                  >
                    <CustomTable data={data || []} columns={columns} />
                  </div>

                  {/*  */}
                  <div
                    className="overflow-y-auto rounded-lg border-t-8 border-t-slate-300 bg-white p-4"
                    style={{
                      // height: '500px',
                      minWidth: '35%'
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
            {/*  */}
          </>
        ) : (
          <div
            className="w-1/2 border border-teal-200
          bg-teal-50
          rounded-lg p-4"
          >
            <h1 className="text-xl text-teal-500 font-bold mb-2">
              Create New Patient Appointment.
            </h1>
            <p className=" text-slate-500 mb-2">
              This patient has no appointments. Learn More about appointments by
              adding a new appointment.
            </p>
            {/* <EditAppointmentDialog patientID={patientID} /> */}
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default AppointmentTab
