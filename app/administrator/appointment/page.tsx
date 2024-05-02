/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
// import { CustomTable } from '@/app/_components/table/CustomTable'
import { appointmentStatusColumns, columns } from './columns'
import { useState } from 'react'
import { Button, Tag } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'

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
  // const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()
  console.log(appointmentStatusData, 'dtc')

  const handleClick = (selectedValue: number) => {
    if (selectedValue === 1) {
      router.push(`${pathname}/add-appointment-agenda`)
    } else {
      router.push(`${pathname}/add-appointment-status`)
    }
  }

  return (
      <div className="p-5 mt-12">
        <div
          className="rounded-md gap-x-4
           flex flex-row mt-4 mb-4
          "
        >
          {categoryList.map((item) => (
            <Button
              key={item.id}
              rounded={'full'}
              size={'sm'}
              bgColor={`${value === item.id && 'gray.700'}`}
              color={`${value === item.id && 'white'}`}
              // shadow={`${value === item.id && 'md'}`}
              _hover={{
                bgColor: `${value === item.id && 'black'}`,
                color: `${value === item.id && 'white'}`
              }}
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.text}
            </Button>
          ))}
        </div>
        <div className="flex flex-row justify-between items-center p-1">
          <div className="flex flex-row gap-x-2 items-center mb-2 mt-4">
            <p className="text-lg text-slate-700">
              {value === 1 ? 'Agenda' : 'Status'}
            </p>
            <Tag
              m={0}
              rounded={'full'}
              fontWeight={'bold'}
              colorScheme="orange"
              size={'sm'}
            >
              {/* {appointmentAgendaData?.length} */}
            </Tag>
          </div>
          <Button
            size={'sm'}
            colorScheme="teal"
            // variant={'outline'}
            onClick={() => {
              handleClick(value)
            }}
            // leftIcon={<FaPlus />}
          >
            NEW
          </Button>
        </div>
        {/* {value === 1 && (
          <CustomTable columns={columns} data={appointmentAgendaData || []} />
        )}

        {value === 2 && (
          <CustomTable columns={appointmentStatusColumns} data={appointmentStatusData || []} />
        )} */}
      </div>
  )
}

export default Appointment
