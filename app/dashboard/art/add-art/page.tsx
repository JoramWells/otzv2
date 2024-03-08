/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { useCallback, useState } from 'react'
import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { useAddArtRegimenMutation } from '@/api/art/artRegimen.api.'

interface PhaseProps {
  id: string
  artCategoryDescription: string
}

const AddArt = () => {
  const [artName, setArtName] = useState('')
  const [artCategoryID, setArtCategoryID] = useState('')
  const [addArtRegimen, { isLoading }] =
    useAddArtRegimenMutation()

  const { data: categoryData } = useGetAllArtRegimenCategoriesQuery()

  const categoryDataOption = useCallback(() => {
    return categoryData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artCategoryDescription
    }))
  }, [categoryData])

  const inputValues = {
    artName,
    artCategoryID
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
          value={artName}
          onChange={setArtName}
        />

        <CustomSelect
          label="Select ART Category"
          data={categoryDataOption()}
          value={artCategoryID}
          onChange={setArtCategoryID}
        />

        <Button
          colorScheme="teal"
          width={'full'}
          onClick={() => addArtRegimen(inputValues)}
          isLoading={isLoading}
        >
          Add Art
        </Button>
      </div>
    </div>
  )
}

export default AddArt
