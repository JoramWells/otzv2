/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useAddMeasuringUnitMutation, useGetAllMeasuringQuery } from '@/api/art/measuringUnit.api'
import { CustomTable } from '../../table/CustomTable'
import { artMeasuringUnit } from '@/app/dashboard/art/columns'
import { CaseManagerDialog } from '../../patient/casemanager/CaseManagerDialog'
import CustomInput from '../../forms/CustomInput'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
    <div>
      <CaseManagerDialog label="NEW" description="Add Measuring Unit">
        <CustomInput
          label="Description"
          placeholder="Enter Description"
          // type="number"
          value={description}
          onChange={setDescription}
        />

        <Button
          size={'lg'}
          className="bg-teal-600 hover:bg-teal-600 shadow-none font-bold
        "
          onClick={() => addMeasuringUnit(inputValues)}
          disabled={isMeasuringLoading}
        >
          {isMeasuringLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add Measuring Unit
        </Button>
      </CaseManagerDialog>
      <CustomTable columns={artMeasuringUnit} data={measuringUnitData || []} />
    </div>
  )
}

export default MeasuringUnit