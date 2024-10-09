import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
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
}

const InitiateART = ({ regimenLine, setRegimenLine, isStandardRegimen, setIsStandardRegimen, artRegimen, setArtRegimen, isNonStandardRegimen, setIsNonStandardRegimen, setStartDate, startDate, nonStandardArtRegimen, setNonStandardArtRegimen, art }: InitiateARTProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 border border-dashed border-slate-200 rounded-lg">
      <h5
      className='text-[16px] font-semibold'
      >
        Initiate patient to ART care
      </h5>
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
              label='Regimen'
                value={artRegimen}
                onChange={setArtRegimen}
                data={art}
              />
            </div>
              )
            : (
            <div>
              <CustomSelect
              label='Non-standard Regimen'
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
        description='Describes the date that the patient started using ART.'
        type="date"
        value={startDate}
        onChange={setStartDate}
      />
    </div>
  )
}

export default InitiateART
