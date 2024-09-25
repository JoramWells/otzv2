/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
'use client'
import { useGetAppointmentQuery } from '@/api/appointment/appointment.api.'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Appointments',
    link: '/'
  }
]

const Page = ({ params }: any) => {
  const { appointmentID } = params
  const { data, isLoading } = useGetAppointmentQuery(appointmentID as string)

  console.log(data)

  return (
    <div className="bg-slate-50 relative h-screen">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-4 flex flex-row space-x-4 items-start">
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <div className="w-1/2 bg-white border border-slate-200 rounded-lg">
            <div className="flex justify-between items-center w-full bg-slate-200 p-2 ">
              <h2>{data?.AppointmentAgenda?.agendaDescription}</h2>
              <div className="flex space-x-2 items-center">
                {data?.isRead ? (
                  <Badge>Read</Badge>
                ) : (
                  <Badge className="bg-slate-100 border border-slate-200 text-slate-500 shadow-none">
                    Unread
                  </Badge>
                )}
                {data?.isStarred ? (
                  <Star className="bg-yellow-500" size={18} />
                ) : (
                  <Star className="text-slate-500" size={18} />
                )}
              </div>
            </div>

            {/*  */}
            <div className="p-2">
              <div className="flex justify-between items-start p-2 ">
                <p>Date</p>
                <div>
                  <p>{moment(data?.appointmentDate).format('ll')}</p>
                </div>
              </div>

              <hr />
              <div className="flex justify-between items-start p-2 ">
                <p>Time</p>
                <div>
                  <p>
                    {moment(data?.appointmentTime, 'HH:mm ss').format(
                      'HH:mm a'
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        )}

        <div
        className='p-4 bg-white rounded-lg flex-1'
        >
          <p>All messages will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default Page
