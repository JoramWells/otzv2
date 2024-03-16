/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../_components/table/CustomTable'
import { columns } from './columns'
import { useState } from 'react'
import { Button } from '@chakra-ui/react'

const categoryList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Cancelled'
  },
  {
    id: 3,
    label: 'Rescheduled'
  },
  {
    id: 4,
    label: 'Upcoming'
  },
  {
    id: 5,
    label: 'Missed'
  }
]

const Patients = () => {
  const [value, setValue] = useState<number>(1)
  const { data } = useGetAllAppointmentsQuery()
  console.log(data, 'dtc')

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

        <CustomTable columns={columns} data={data || []} />
      </div>
    </div>
  )
}

export default Patients
