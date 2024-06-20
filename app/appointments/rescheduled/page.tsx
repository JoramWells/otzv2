'use client'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useCallback } from 'react'
import { rescheduledColumns } from '../columns'
import { Skeleton } from '@/components/ui/skeleton'
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
    label: 'Dashboard',
    link: '/'
  }
]

const Rescheduled = () => {
  const { data } = useGetAllAppointmentsQuery({
    mode: 'weekly',
    date: '2022-01-01'
  })
  const rescheduledAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.AppointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Rescheduled'.toLowerCase())
    )
  }, [data])

  console.log(rescheduledAppointment(), 'res')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className='p-4'>
        <div
        className='bg-white rounded-lg p-4'
        >
          <CustomTable
            columns={rescheduledColumns}
            data={rescheduledAppointment() || []}
          />
        </div>
      </div>
    </div>
  )
}

export default Rescheduled
