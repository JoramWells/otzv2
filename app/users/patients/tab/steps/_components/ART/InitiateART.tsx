/* eslint-disable @typescript-eslint/ban-types */
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import { type ARTPrescriptionInterface } from 'otz-types'
import React, { type Dispatch, type SetStateAction } from 'react'

interface InputProps {
  id: string
  label: string
}
interface InitiateARTProps {
  regimenLine: string
  setRegimenLine: Dispatch<SetStateAction<string>>
  isStandardRegimen: boolean
  setIsStandardRegimen: Dispatch<SetStateAction<boolean>>
  artRegimen: string
  setArtRegimen: Dispatch<SetStateAction<string>>
  isNonStandardRegimen: boolean
  setIsNonStandardRegimen: Dispatch<SetStateAction<boolean>>
  startDate: string
  setStartDate: Dispatch<SetStateAction<string>>
  nonStandardArtRegimen: string
  setNonStandardArtRegimen: Dispatch<SetStateAction<string>>
  art: InputProps[]
  handleSubmit: () => {}
  handleBack: () => void
  handleNext: () => void
  isLoading: boolean
  data: ARTPrescriptionInterface[]
}

const InitiateART = ({
  regimenLine, setRegimenLine, isStandardRegimen, setIsStandardRegimen, artRegimen, setArtRegimen, isNonStandardRegimen, setIsNonStandardRegimen, setStartDate, startDate, nonStandardArtRegimen, setNonStandardArtRegimen, art,
  handleBack, handleNext, handleSubmit, isLoading, data

}: InitiateARTProps) => {
  return (
    <div className="flex flex-col pt-2 space-y-2 rounded-lg">
      <CustomSelect
        label="Regimen Line"
        description="Select the patient treatment phase."
        value={regimenLine}
        onChange={setRegimenLine}
        data={[
          {
            id: 'first Line',
            label: 'First Line'
          },
          {
            id: 'second Line',
            label: 'Second Line'
          },
          {
            id: 'third Line',
            label: 'Third Line'
          }
        ]}
      />

      <div>
        <CustomCheckbox
          label="Standard Regimen"
          value={isStandardRegimen}
          onChange={setIsStandardRegimen}
        />

        <div className="rounded-lg p-4 border border-slate-200 ">
          {isStandardRegimen
            ? (
            <div>
              <CustomSelect
                label="Regimen"
                value={artRegimen}
                onChange={setArtRegimen}
                data={art}
              />
            </div>
              )
            : (
            <div>
              <CustomSelect
                label="Non-standard Regimen"
                value={nonStandardArtRegimen}
                onChange={setNonStandardArtRegimen}
                data={[
                  {
                    id: 'lopinavir',
                    label: 'Lopinavir'
                  }
                ]}
              />
            </div>
              )}
        </div>
      </div>

      <CustomInput
        label="Date"
        description="Describes the date that the patient started using ART."
        type="date"
        value={startDate}
        onChange={setStartDate}
      />

      {/*  */}
      <div className="flex justify-end mt-4 space-x-4 ">
        <Button
          onClick={() => {
            handleBack()
          }}
          className="shadow-none text-slate-500"
          variant="outline"
          size={'sm'}
        >
          <ChevronsLeft className="mr-2" size={18} />
          Back
        </Button>
        {data?.length > 0
          ? (
          <Button
            className=" shadow-none  text-slate-500"
            variant="outline"
            onClick={() => {
              handleNext()
            }}
            size={'sm'}
          >
            Next
            <ChevronsRight className="ml-2" size={18} />
          </Button>
            )
          : (
          <Button
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
            size={'sm'}
          >
            {isLoading && <Loader2 className="mr-2" size={18} />}
            Save
          </Button>
            )}
      </div>
    </div>
  )
}

export default InitiateART
