/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useCallback, useState } from 'react'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import { useAddArtRegimenCategoryMutation } from '@/api/art/artRegimenCategory.api'
import { useAddAppointmentAgendaMutation } from '@/api/appointment/appointmentAgenda.api'

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const AddAppointmentAgenda = () => {
  const [agendaDescription, setAgendaDescription] = useState('')
  const [artPhaseID, setArtPhaseID] = useState('')
  const [addAppointmentAgenda, { isLoading }] =
    useAddAppointmentAgendaMutation()

  const { data: phaseData } = useGetAllArtRegimenPhaseQuery()

  const inputValues = {
    agendaDescription
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
        <CustomInput
          label="Agenda Description"
          value={agendaDescription}
          onChange={setAgendaDescription}
        />

        <Button
          colorScheme="teal"
          width={'full'}
          onClick={() => addAppointmentAgenda(inputValues)}
          isLoading={isLoading}
        >
          Add Agenda
        </Button>
      </div>
    </div>
  )
}

export default AddAppointmentAgenda
