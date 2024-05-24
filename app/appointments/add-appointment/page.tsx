/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../components/forms/CustomInput'
import { useCallback, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useAddAppointmentMutation } from '@/api/appointment/appointment.api.'
import moment from 'moment'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import CustomTimeInput from '@/components/forms/CustomTimeInput'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

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
    link: ''
  }
]

const AddArtCategory = ({ params }: any) => {
  const patientID = params.patientID
  const [userID, setUserID] = useState('')
  const [agenda, setAppointmentAgenda] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [status, setStatus] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const [addAppointment, { isLoading }] = useAddAppointmentMutation()

  const { data: usersData } = useGetAllUsersQuery()

  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()

  const usersOption = useCallback(() => {
    return usersData?.map((item: any) => ({
      id: item.id,
      label: item.firstName
    }))
  }, [usersData])

  //
  const appointmentOptions = useCallback(() => {
    return appointmentAgendaData?.map((item: any) => ({
      id: item.id,
      label: item.agendaDescription
    }))
  }, [appointmentAgendaData])

  //
  const appointmentStatusOptions = useCallback(() => {
    return appointmentStatusData?.map((item: any) => ({
      id: item.id,
      label: item.statusDescription
    }))
  }, [appointmentStatusData])

  const inputValues = {
    appointmentAgendaID: agenda,
    patientID,
    userID,
    appointmentDate,
    appointmentTime: moment().hour(parseInt(hours, 10)).minute(parseInt(minutes, 10)).format('HH:mm'),
    appointmentStatusID: status
  }

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div className='flex flex-col items-center w-full'>
        <div
          className="border border-gray-200 bg-white
        w-1/3 flex flex-col
      rounded-lg p-5 gap-y-6 mt-4"
          style={{
            width: '40%'
          }}
        >
          <CustomSelect
            label="Requested By"
            data={usersOption()}
            value={userID}
            onChange={setUserID}
          />

          {/* date-picker input */}

          <CustomInput
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            onChange={setAppointmentDate}
          />

          <CustomTimeInput
            label="Appointment Time"
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
          />

          {/*  */}
          <CustomSelect
            label="Agenda/Reason"
            data={appointmentOptions()}
            value={agenda}
            onChange={setAppointmentAgenda}
          />

          {/*  */}
          <CustomSelect
            label="Status"
            data={appointmentStatusOptions()}
            value={status}
            onChange={setStatus}
          />

          <Button
            size={'lg'}
            className="bg-teal-600 hover:bg-teal-700 font-bold
          shadow-none
          "
            // colorScheme="teal"
            // width={'full'}
            onClick={() => addAppointment(inputValues)}
            // isLoading={isLoading}
          >
            Create Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddArtCategory
