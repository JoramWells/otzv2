/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import { useState } from 'react'
import { useAddArtRegimenPhaseMutation } from '@/api/art/artRegimenPhase.api'

const AddArt = () => {
  const [artPhaseDescription, setArtPhaseDescription] = useState('')
  const [addArtRegimenPhase, { isLoading }] = useAddArtRegimenPhaseMutation()

  const inputValues = {
    artPhaseDescription
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
          label="Description"
          value={artPhaseDescription}
          onChange={setArtPhaseDescription}
        />

        <Button colorScheme="teal" width={'full'}
        onClick={() => addArtRegimenPhase(inputValues)}
        isLoading={isLoading}
        >
          Add Phase
        </Button>
      </div>
    </div>
  )
}

export default AddArt
