/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
'use client'
import { useGetAppointmentQuery } from '@/api/appointment/appointment.api.'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { History, Star, Trash2, X } from 'lucide-react'
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
          <Skeleton className="w-1/2 h-[250px]" />
        ) : (
          <div className="w-1/2 bg-white border border-slate-200 rounded-lg">
            <div className="flex justify-between items-center w-full bg-slate-200 p-2 ">
              <h2 className="capitalize text-[14px] font-bold">
                {data?.AppointmentAgenda?.agendaDescription}
              </h2>
              <div className="flex space-x-2 items-center">
                {data?.isStarred ? (
                  <Star className="bg-yellow-500" size={18} />
                ) : (
                  <Star className="text-slate-500" size={18} />
                )}
                {data?.isRead ? (
                  <Badge>Read</Badge>
                ) : (
                  <Badge className="bg-slate-100 border border-slate-200 text-slate-500 shadow-none">
                    Unread
                  </Badge>
                )}

                <Badge>{data?.AppointmentStatus?.statusDescription}</Badge>
              </div>
            </div>

            {/*  */}
            <div className="p-2 text-[14px] ">
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
              <hr />
              <div className="flex justify-end space-x-2 mt-2">
                <Button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-500 flex space-x-2 items-center">
                  <History size={18} className='mr-2' />
                  Reschedule
                </Button>
                <Button className="bg-slate-50 hover:bg-slate-100 text-slate-500 flex space-x-2 items-center">
                  <X size={18} className="mr-2" />
                  Cancel
                </Button>
                <Button className="flex items-center bg-red-50 hover:bg-red-100 text-red-500">
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            {/*  */}
          </div>
        )}

        <div className="p-4 bg-white rounded-lg flex-1">
          <p>All messages will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default Page
