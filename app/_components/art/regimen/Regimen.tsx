/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { Button } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'
import { useCallback, useState } from 'react'
import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { useAddArtRegimenMutation, useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { CaseManagerDialog } from '../../patient/casemanager/CaseManagerDialog'
import { CustomTable } from '../../table/CustomTable'
import { artColumns } from '@/app/dashboard/art/columns'
import { useGetAllMeasuringQuery } from '@/api/art/measuringUnit.api'

interface PhaseProps {
  id: string
  description: string
  artCategoryDescription: string
}

const Regimen = () => {
  const [artName, setArtName] = useState('')
  const [artCategoryID, setArtCategoryID] = useState('')
  const [quantity, setQuantity] = useState('')
  const [measuringUnitID, setMeasuringUnit] = useState('')

  const { data: artData } = useGetAllArtRegimenQuery()

  console.log(artData, 'kju')

  const [addArtRegimen, { isLoading }] =
    useAddArtRegimenMutation()

  const { data: measuringUnitData } = useGetAllMeasuringQuery()

  const { data: categoryData } = useGetAllArtRegimenCategoriesQuery()

  const categoryDataOption = useCallback(() => {
    return categoryData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artCategoryDescription
    }))
  }, [categoryData])

  const measuringUnitOption = useCallback(() => {
    return measuringUnitData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.description
    }))
  }, [measuringUnitData])

  const inputValues = {
    artName,
    artCategoryID,
    measuringUnitID,
    quantity
  }

  return (
    <div>
      <CaseManagerDialog label="NEW"
      description='Add ART'
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

        <CustomSelect
          label="Measuring Unit"
          data={measuringUnitOption()}
          value={measuringUnitID}
          onChange={setMeasuringUnit}
        />

        <CustomInput
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          type="number"
        />

        <Button
          colorScheme="teal"
          width={'full'}
          onClick={() => addArtRegimen(inputValues)}
          isLoading={isLoading}
        >
          Add Art
        </Button>
      </CaseManagerDialog>

      {/* table */}
      <CustomTable columns={artColumns} data={artData || []} />
    </div>
  )
}

export default Regimen
