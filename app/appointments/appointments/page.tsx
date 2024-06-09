/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Suspense } from 'react'

// import { AppointmentFilter } from './__components/AppointmentFilter'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import AppointmentHomepage from '@/app/_components/appointment/AppointmentHomepage'
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
    label: 'Dashboard',
    link: '/'
  }
]

const AppointmentPage = () => {
  // const showNotification = useNotification()

  // useEffect(() => {
  //   // if (data) {
  //   // setAppointments(data)
  //   // }
  //   const socket: Socket = socketIOClient(`${process.env.NEXT_PUBLIC_API_URL}/api/appointment`)

  //   socket.on('appointment-updated', (socketData: NotificationProps) => {
  //     showNotification()
  //     // setAppointments(socketData)
  //     console.log(socketData)
  //   })

  //   // ceck tab
  //   if (tab === null) {
  //     params.set('tab', 'all')
  //     setValue('all')
  //   }

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [data, showNotification, params, tab])

  return (
    <div className="bg-slate-50 ">
      <BreadcrumbComponent dataList={dataList2} />

      {/* tab navigation */}
      <Suspense fallback={<div>loading...</div>}>
        <AppointmentHomepage />
      </Suspense>
    </div>
  )
}

export default AppointmentPage
