/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useAddAppointmentMutation, useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import moment from 'moment'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useGetAllAppointmentAgendaQuery, useGetAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import CustomTimeInput from '@/app/_components/forms/CustomTimeInput'
import CustomInput from '@/app/_components/forms/CustomInput'

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const EditAppointment = ({ params }: any) => {
  const appointmentID = params.appointmentID
  const [userID, setUserID] = useState('')
  const [agenda, setAppointmentAgenda] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [status, setStatus] = useState('')
  const [minutes, setMinutes] = useState('')

  const [addAppointment, { isLoading }] = useAddAppointmentMutation()

  const { data: usersData } = useGetAllUsersQuery()

  const { data: appointmentData } = useGetAppointmentDetailQuery(appointmentID)
  const [hours, setHours] = useState('')

  // useEffect(()=>{
  //   if(appointmentData){
  //     set
  //   }
  // },[])

  console.log(appointmentData, 'gt')

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
    appointmentID,
    userID,
    appointmentDate,
    appointmentTime: moment().hour(hours).minute(minutes).format('HH:mm'),
    appointmentStatusID: status
  }

  return (
    <div className="flex flex-row justify-center">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col
      rounded-lg p-5 gap-y-6 mt-14"
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
          colorScheme="teal"
          width={'full'}
          onClick={() => addAppointment(inputValues)}
          isLoading={isLoading}
        >
          Create Appointment
        </Button>
      </div>
    </div>
  )
}

export default EditAppointment
