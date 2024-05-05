/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import { useUpdateMeasuringUnitMutation } from '@/api/art/measuringUnit.api'
import CustomInput from '@/components/forms/CustomInput'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'

interface DataProps {
  id: string
  value: string
}

export default function EditMeasuringUnit ({ id, value }: DataProps) {
  const [description, setDescription] = useState(value)

  const [updateMeasuringUnit, { isLoading: isLoadingUpdateMeasuringUnit }] = useUpdateMeasuringUnitMutation()
  const inputValues = {
    id,
    description
  }

  return (
    <CaseManagerDialog label="Edit" description="Add Measuring Unit">
      <CustomInput
        label="Description"
        placeholder="Enter Description"
        // type="number"
        value={description}
        onChange={setDescription}
      />

      <div className="w-full flex flex-row justify-end space-x-4">
        <Button
          //   size={'lg'}
          className="border-red-600 hover:bg-white bg-red-50 shadow-none
            text-red-500 hover:text-red-600
            flex items-center space-x-2
            "
          // onClick={() => addMeasuringUnit(inputValues)}
          // disabled={isMeasuringLoading}
        >
          {/* {isMeasuringLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )} */}
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button
          //   size={'lg'}
          onClick={() => updateMeasuringUnit(inputValues)}
          className="bg-teal-600 hover:bg-teal-600 shadow-none font-bold
        "
          disabled={isLoadingUpdateMeasuringUnit}
        >
          {isLoadingUpdateMeasuringUnit
            ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )
            : (
            <Edit2 className="h-4 w-4 mr-2" />
              )}
          Edit
        </Button>
      </div>
    </CaseManagerDialog>
  )
}
