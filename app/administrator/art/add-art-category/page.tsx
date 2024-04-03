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

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const ageLineOptions = [
  {
    id: 'Adults',
    label: 'Adults'
  },
  {
    id: 'Pediatric',
    label: 'Pediatric'
  }
]

const AddArtCategory = () => {
  const [artCategoryDescription, setArtCategoryDescription] = useState('')
  const [artPhaseID, setArtPhaseID] = useState('')
  const [ageLine, setAgeLine] = useState('')
  const [addArtRegimenCategory, { isLoading }] =
    useAddArtRegimenCategoryMutation()

  const { data: phaseData } = useGetAllArtRegimenPhaseQuery()

  const phaseDataOption = useCallback(() => {
    return phaseData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [phaseData])

  const inputValues = {
    artCategoryDescription,
    artPhaseID,
    ageLine
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
          value={artCategoryDescription}
          onChange={setArtCategoryDescription}
        />
        <CustomSelect
          label="Select Age"
          data={ageLineOptions}
          value={ageLine}
          onChange={setAgeLine}
        />

        <CustomSelect
          label="Select ART Phase"
          data={phaseDataOption()}
          value={artPhaseID}
          onChange={setArtPhaseID}
        />

        <Button
          colorScheme="teal"
          width={'full'}
          onClick={() => addArtRegimenCategory(inputValues)}
          isLoading={isLoading}
        >
          Add Phase
        </Button>
      </div>
    </div>
  )
}

export default AddArtCategory
