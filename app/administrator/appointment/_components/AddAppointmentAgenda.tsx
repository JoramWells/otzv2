/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useAddAppointmentAgendaMutation } from '@/api/appointment/appointmentAgenda.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'

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
  const [addAppointmentAgenda, { isLoading }] =
    useAddAppointmentAgendaMutation()

  const inputValues = {
    agendaDescription
  }

  return (
    <div
      className="bg-white
        w-1/4 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4"
    >
      <CustomInput
        label="Agenda Description"
        value={agendaDescription}
        onChange={setAgendaDescription}
      />

      <Button
        //   colorScheme="teal"
        //   width={'full'}
        onClick={() => addAppointmentAgenda(inputValues)}
        disabled={isLoading}
        className="w-full shadow-none  text-black border-teal-200 bg-slate-200 hover:bg-slate-100"
      >
        {isLoading && <Loader2 className='mr-2' size={18} />}
        Add Agenda
      </Button>
    </div>
  )
}

export default AddAppointmentAgenda
