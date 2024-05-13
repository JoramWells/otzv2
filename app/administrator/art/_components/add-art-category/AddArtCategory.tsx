/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useAddArtRegimenCategoryMutation } from '@/api/art/artRegimenCategory.api'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'

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

const artPhase = [
  {
    id: 'first line',
    label: 'First Line'
  },
  {
    id: 'second line',
    label: 'Second Line'
  },
  {
    id: 'third line',
    label: 'Third Line'
  }
]

const AddArtCategory = () => {
  const [artCategoryDescription, setArtCategoryDescription] = useState('')
  const [artPhaseID, setArtPhaseID] = useState('')
  const [ageLine, setAgeLine] = useState('')
  const [addArtRegimenCategory, { isLoading }] =
    useAddArtRegimenCategoryMutation()

  const inputValues = {
    artCategoryDescription,
    artPhaseID,
    ageLine
  }

  return (
      <div
        className="bg-white
        flex flex-col items-center
      justify-center rounded-lg p-4 gap-y-4"
       >
        <CustomInput
          label="ART Category Description"
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
          data={artPhase}
          value={artPhaseID}
          onChange={setArtPhaseID}
        />

        <Button
        className='w-full shadow-none bg-slate-200 focus:bg-slate-100 text-black'
          // colorScheme="teal"
          // width={'full'}
          onClick={() => addArtRegimenCategory(inputValues)}
          disabled={isLoading}
        >
          Add Phase
        </Button>
      </div>
  )
}

export default AddArtCategory
