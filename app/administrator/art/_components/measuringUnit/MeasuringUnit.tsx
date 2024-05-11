/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useAddMeasuringUnitMutation, useGetAllMeasuringQuery } from '@/api/art/measuringUnit.api'
import { artMeasuringUnit } from '@/app/administrator/art/columns'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomInput from '@/components/forms/CustomInput'

function MeasuringUnit () {
  const [description, setDescription] = useState('')
  const { data: measuringUnitData } = useGetAllMeasuringQuery()
  const router = useRouter()

  const [addMeasuringUnit, { isLoading: isMeasuringLoading, data: measuringUnitResponse }] = useAddMeasuringUnitMutation()
  const inputValues = {
    description

  }

  useEffect(() => {
    if (measuringUnitResponse) {
      router.refresh()
    }
  }, [router, measuringUnitResponse])
  return (
    <div
    className='flex flex-row space-x-4 items-start mt-4'
    >
      <div
      className='w-3/5 bg-white rounded-lg p-4'
      >
        <CustomTable
          columns={artMeasuringUnit}
          data={measuringUnitData || []}
          isSearch={false}
        />
      </div>
      <div className="w-2/5 bg-white rounded-lg p-4 flex flex-col space-y-4">
        <CustomInput
          label="Description"
          placeholder="Enter Description"
          // type="number"
          value={description}
          onChange={setDescription}
        />

        <Button
          size={'lg'}
          className="bg-slate-100 hover:bg-slate-50 shadow-none font-bold text-slate-700
        "
          onClick={() => addMeasuringUnit(inputValues)}
          disabled={isMeasuringLoading}
        >
          {isMeasuringLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add Measuring Unit
        </Button>
      </div>
    </div>
  )
}

export default MeasuringUnit
