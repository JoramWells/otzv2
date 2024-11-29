'use client'

import { type ExtendedAppointmentInputProps, useGetStarredPatientAppointmentsQuery } from '@/api/appointment/appointment.api.'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { useUserContext } from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import { columns } from '../columns'
import { CustomTable } from '@/app/_components/table/CustomTable'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Appointments',
    link: '/appointments/appointments'
  }
]
const TrackPatientPage = () => {
  const [responseData, setResponseData] = useState<ExtendedAppointmentInputProps[] | undefined>([])
  const [total, setTotal] = useState<number | undefined>(0)
  const { authUser } = useUserContext()
  const { data, isLoading } = useGetStarredPatientAppointmentsQuery({
    hospitalID: authUser?.hospitalID as unknown as string,
    page: 1,
    pageSize: 10,
    searchQuery: '',
    status: 'all'
  },
  {
    skip: (authUser?.hospitalID) == null
  })

  useEffect(() => {
    if (data != null) {
      setResponseData(data.data)
      setTotal(data.total)
    }
  }, [data])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      {/*  */}
      <div
      className='p-2'
      >
        <div className='p-2 bg-white rounded-lg'>
          <CustomTable
            columns={columns}
            isLoading={isLoading}
            total={total}
            data={responseData ?? []}
            //   search={search}
            //   setSearch={setSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default TrackPatientPage
