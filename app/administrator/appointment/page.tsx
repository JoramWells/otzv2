/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
// import { CustomTable } from '@/app/_components/table/CustomTable'
import { appointmentStatusColumns, columns } from './columns'
import { useState } from 'react'
// import { Button, Tag } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import AddAppointmentAgenda from './_components/AddAppointmentAgenda'
import AddAppointmentStatus from './_components/AddAppointmentStatus'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const categoryList = [
  {
    id: 1,
    text: 'Agenda'
  },
  {
    id: 2,
    text: 'Status'
  }
]

const Appointment = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(1)
  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()
  console.log(appointmentStatusData, 'dtc')

  const breadCrumbList = [
    {
      id: '1',
      label: 'home',
      link: '/'
    },
    {
      id: '2',
      label: 'Appointment',
      link: 'appointment'
    }
  ]

  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={breadCrumbList} />
      <div
        className="gap-x-4 flex flex-row mt-4 mb-4 bg-white p-2 rounded-lg
          "
      >
        {categoryList.map((item) => (
          <Button
            key={item.id}
            className={`shadow-none rounded-full bg-slate-100 text-slate-500 hover:bg-teal-100
              ${value === item.id && 'bg-teal-50 text-teal-600'}
              `}
            // rounded={'full'}
            // size={'sm'}
            // bgColor={`${value === item.id && 'gray.700'}`}
            // color={`${value === item.id && 'white'}`}
            // shadow={`${value === item.id && 'md'}`}
            // _hover={{
            //   bgColor: `${value === item.id && 'black'}`,
            //   color: `${value === item.id && 'white'}`
            // }}
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.text}
          </Button>
        ))}
      </div>
      {value === 1 && (
        <div className="w-full">
          <p className="mb-2 text-lg font-bold text-slate-700">
            Manage Appointment Agenda
          </p>

          <div className="w-full flex items-start space-x-4">
            <div className="w-3/4 bg-white p-2 rounded-lg">
              <CustomTable
                columns={columns}
                data={appointmentAgendaData || []}
                isSearch={false}
              />
            </div>
            <AddAppointmentAgenda />
          </div>
        </div>
      )}

      {value === 2 && (
        <div className='w-full'>
          <p className="mb-2 text-lg font-bold text-slate-700">
            Manage Appointment Status
          </p>
          <div className="w-full flex items-start space-x-4">
            <div className="w-3/4 bg-white p-2 rounded-lg">
              <CustomTable
                columns={appointmentStatusColumns}
                data={appointmentStatusData || []}
                isSearch={false}
              />
            </div>
            <AddAppointmentStatus />
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointment
