/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { useAddArtRegimenMutation, useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { artColumns } from '@/app/administrator/art/columns'
import { useGetAllMeasuringQuery } from '@/api/art/measuringUnit.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { type ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomSelect2 from '@/components/forms/CustomSelect2'
import CustomInput2 from '@/components/forms/CustomInput2'

interface PhaseProps {
  id: string
  description: string
  artCategoryDescription: string
}

interface InputProps {
  artName: string
  artCategoryID: string
  measuringUnitID: string
  quantity: number
  expiryDate: Date
}

const Regimen = () => {
  const { data: artData } = useGetAllArtRegimenQuery()

  const Schema: ZodType<InputProps> = z.object({
    artName: z.string(),
    artCategoryID: z.string(),
    measuringUnitID: z.string(),
    quantity: z.number(),
    expiryDate: z.date()
  })

  const methods = useForm<InputProps>({
    resolver: zodResolver(Schema)
  })

  const [addArtRegimen, { isLoading }] =
    useAddArtRegimenMutation()

  const handleSubmit = async (data: any) => {
    await addArtRegimen(data)
    // console.log(data)
  }

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

  return (
    <div className="w-full flex flex-row space-x-2 items-start mt-2">
      {/* table */}
      <div className="w-3/5 bg-white p-4 rounded-lg">
        <CustomTable
          columns={artColumns}
          data={artData || []}
          isSearch={false}
        />
      </div>

      {/* form */}
      <FormProvider {...methods}>
        <form
          //  label="NEW"
          // description='Add ART'
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="w-2/5 bg-white rounded-lg p-4 flex flex-col space-y-4"
        >
          <CustomInput2 label="Regimen" name="artName" />

          <CustomInput2
            label="Expiry Date"
            type="date"
            name='expiryDate'
            // onChange={setExpiryDate}
          />
          <CustomSelect2
            label="Select ART Category"
            data={categoryDataOption()}
            name="artCategoryID"
          />

          <CustomSelect2
            label="Measuring Unit"
            data={measuringUnitOption()}
            name='measuringUnitID'
            // onChange={setMeasuringUnit}
          />

          <CustomInput2
            label="Quantity"
            name='quantity'
            // onChange={setQuantity}
            type="number"
          />

          <Button
            type="submit"
            // width={'full'}
            // onClick={() => addArtRegimen(inputValues)}
            disabled={isLoading}
            className="shadow-none text-teal-600 border-teal-200"
            variant={'outline'}
          >
            Add Art
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Regimen
