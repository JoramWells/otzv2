/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useCallback, useState } from 'react'
import { useAddArtRegimenPhaseMutation, useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useAddArtRegimenCategoryMutation } from '@/api/art/artRegimenCategory.api'
import { useAddAppointmentMutation } from '@/api/appointment/appointment.api.'
import moment from 'moment'

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const AddArtCategory = ({ params }: any) => {
  const patientID = params.patientID
  const [agenda, setAppointmentAgenda] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [status, setStatus] = useState('')

  const [artCategoryDescription, setArtCategoryDescription] = useState('')
  const [artPhaseID, setArtPhaseID] = useState('')
  const [addAppointment, { isLoading }] = useAddAppointmentMutation()

  const { data: phaseData } = useGetAllArtRegimenPhaseQuery()

  const phaseDataOption = useCallback(() => {
    return phaseData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [phaseData])

  const inputValues = {
    appointmentAgendaID: agenda,
    patientID,
    // userID,
    appointmentDate,
    appointmentTime: moment(new Date(appointmentTime)).format('HH:mm:ss'),
    appointmentStatusID: status
  }

  return (
    <div className="flex flex-row justify-center">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-14"
        style={{
          width: '40%'
        }}
      >
        {/* <CustomSelect
          label="Requested By"
          link="/add-user"
          data={[]}
          value={userID}
          onChange={setUserID}
        /> */}

        {/* date-picker input */}

        <CustomInput
          label="Select Date"
          type="date"
          value={appointmentDate}
          onChange={setAppointmentDate}
        />
        {/*
        <CustomTimePicker
          label="Select Time"
          description="At what time will the meeting happen?"
          value={appointmentTime}
          onChange={setAppointmentTime}
        /> */}

        {/*  */}
        <CustomSelect
          label="Agenda/Reason"
          data={[]}
          value={agenda}
          onChange={setAppointmentAgenda}
        />

        {/*  */}
        <CustomSelect
          label="Status"
          data={[]}
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

export default AddArtCategory
