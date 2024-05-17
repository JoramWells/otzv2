/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useEffect } from 'react'
import useNotification from '@/hooks/useNotification'
import { type NotificationProps } from '@/context/NotificationContext'
import socketIOClient, { type Socket } from 'socket.io-client'
// import { useGetAllPrescriptionsQuery } from '@/api/pillbox/artPrescription.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useGetAllPrescriptionsQuery } from '@/api/pillbox/prescription.api'
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
    label: 'dashboard',
    link: 'dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: 'prescription'
  }
]

const PrescriptionPage = () => {
  const { data } = useGetAllPrescriptionsQuery()

  console.log(data, 'yu')

  const showNotification = useNotification()

  useEffect(() => {
    // if (data) {
    // setAppointments(data)
    // }
    const socket: Socket = socketIOClient('http://localhost:5000')

    socket.on('appointment-updated', (socketData: NotificationProps) => {
      showNotification()
      // setAppointments(socketData)
      console.log(socketData)
    })

    return () => {
      socket.disconnect()
    }
  }, [data, showNotification])

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between bg-white p-4 mt-2 ">
        <h1 className="text-xl text-slate-700 font-semibold">Prescriptions</h1>
      </div>
      <div className="p-4">
        <div
        className='p-4 bg-white rounded-lg'
        >
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  )
}

export default PrescriptionPage
