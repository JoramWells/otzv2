/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
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
  const [artPhaseID, setArtPhaseID] = useState('')
  // const [addAppointmentAgenda, { isLoading }] =
  //   useAddAppointmentAgendaMutation()

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
          // onClick={() => addAppointmentAgenda(inputValues)}
          // isLoading={isLoading}
          className='w-full shadow-none  text-teal-600 border-teal-200'
          variant={'outline'}
        >
          Add Agenda
        </Button>
      </div>
  )
}

export default AddAppointmentAgenda
