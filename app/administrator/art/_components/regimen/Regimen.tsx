/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { useAddArtRegimenMutation, useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { artColumns } from '@/app/administrator/art/columns'
import { useGetAllMeasuringQuery } from '@/api/art/measuringUnit.api'
import CustomInput from '@/components/forms/CustomInput'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'

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
  const [expiryDate, setExpiryDate] = useState('')

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
    quantity,
    expiryDate
  }

  return (
    <div className="w-full flex flex-row space-x-4 items-start">
      {/* table */}
      <div
      className='w-3/4'
      >
        <CustomTable columns={artColumns} data={artData || []}
        isSearch={false}
         />
      </div>

      {/* form */}
      <div
      //  label="NEW"
      // description='Add ART'
      className='w-1/4 bg-white rounded-lg p-4 flex flex-col space-y-4'
      >
        <CustomInput
          label="Description"
          value={artName}
          onChange={setArtName}
        />

        <CustomInput
          label="Expiry Date"
          type="date"
          value={expiryDate}
          onChange={setExpiryDate}
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
          // colorScheme="teal"
          // width={'full'}
          onClick={() => addArtRegimen(inputValues)}
          disabled={isLoading}
          className='shadow-none text-teal-600 border-teal-200'
          variant={'outline'}
        >
          Add Art
        </Button>
      </div>
    </div>
  )
}

export default Regimen
