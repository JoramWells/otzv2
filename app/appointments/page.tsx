/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@chakra-ui/react'
import AppointmentStatusTab from '../_components/appointment/tabs/AppointmentStatusTab'

const Patients = () => {
  const [value, setValue] = useState<number>(1)
  const { data } = useGetAllAppointmentsQuery()

  const missedAppointment = useCallback(() => {
    return data?.filter((item: any) => item.appointmentStatus?.statusDescription.toLowerCase().includes('Missed'.toLowerCase()))
  }, [data])

  const upcomingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Upcoming'.toLowerCase())
    )
  }, [data])

  const rescheduledAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Rescheduled'.toLowerCase())
    )
  }, [data])

  const pendingAppointment = useCallback(() => {
    return data?.filter((item: any) =>
      item.appointmentStatus?.statusDescription
        .toLowerCase()
        .includes('Pending'.toLowerCase())
    )
  }, [data])

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: `All ${data?.length}`
      },
      {
        id: 2,
        label: `Pending ${pendingAppointment()?.length}`
      },
      {
        id: 3,
        label: `Rescheduled ${rescheduledAppointment()?.length}`
      },
      {
        id: 4,
        label: `Upcoming ${upcomingAppointment()?.length}`
      },
      {
        id: 5,
        label: `Missed ${missedAppointment()?.length}`
      }
    ],
    [missedAppointment, data?.length]
  )

  console.log(missedAppointment(), 'dtc')

  return (
    <div className="ml-64 pt-12">
      <div className="p-5">
        <p className="mb-4 text-xl font-semibold text-slate-700">
          Patient Appointments
        </p>
        <div
          className="flex flex-row space-x-4
      border-b mb-4
      "
        >
          {categoryList.map((item) => (
            <Button
              key={item.id}
              rounded={'0'}
              h={10}
              size={'sm'}
              // w={'full'}
              borderBottom={`${value === item.id ? '2px' : '0'}`}
              fontWeight={`${value === item.id ? 'bold' : 'normal'}`}
              bgColor={`${value === item.id ? 'teal.50' : 'transparent'}`}
              color={`${value === item.id ? 'teal' : 'gray.500'}`}
              // bgColor={'white'}
              // shadow={`${value === item.id && 'md'}`}
              _hover={
                {
                  // bgColor: `${value === item.id && 'black'}`,
                  // color: `${value === item.id && 'white'}`
                }
              }
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {value === 1 && (
          <CustomTable columns={columns} data={data || []} />
        )}

        {value === 2 && (
          <AppointmentStatusTab columns={columns} data={pendingAppointment() || []} />
        )}

        {value === 3 && (
          <CustomTable columns={columns} data={rescheduledAppointment() || []} />
        )}

        {value === 4 && (
          <CustomTable columns={columns} data={upcomingAppointment() || []} />
        )}

        {value === 5 && <CustomTable columns={columns} data={missedAppointment() || []} /> }
      </div>
    </div>
  )
}

export default Patients
