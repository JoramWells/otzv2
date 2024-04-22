/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useCallback, useState } from 'react'
import CustomInput from '../forms/CustomInput'
import CustomTimeInput from '../forms/CustomTimeInput'
import CustomSelect from '../forms/CustomSelect'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddAppointmentMutation } from '@/api/appointment/appointment.api.'
import { Button } from '@/components/ui/button'
import moment from 'moment'

interface DataProps {
  patientID: string
}

const EditAppointmentDialog = ({ patientID }: DataProps) => {
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
    appointmentTime: moment()
      .hour(parseInt(hours, 10))
      .minute(parseInt(minutes, 10))
      .format('HH:mm'),
    appointmentStatusID: status
  }
  return (
    <Dialog>
      <DialogTrigger>NEW</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  )
}

export default EditAppointmentDialog
