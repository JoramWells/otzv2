/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import useNotification from '@/hooks/useNotification'
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
    link: '/dashboard'
  },
  {
    id: '3',
    label: 'prescription',
    link: '/prescription'
  }
]

const PrescriptionPage = () => {
  const { data } = useGetAllPrescriptionsQuery()

  const sortedData = data ? [...data] : []
  sortedData.sort(
    (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
  )

  const showNotification = useNotification()

  // useEffect(() => {
  // if (data) {
  // setAppointments(data)
  // }
  // const socket: Socket = socketIOClient('http://localhost:5000')

  // socket.on('appointment-updated', (socketData: NotificationProps) => {
  //   showNotification()
  // setAppointments(socketData)
  //   console.log(socketData)
  // })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [data, showNotification])

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2">
        <div
        className='bg-white rounded-lg p-2'
        >
          <CustomTable columns={columns} data={sortedData || []} />
        </div>
      </div>
    </>
  )
}

export default PrescriptionPage
