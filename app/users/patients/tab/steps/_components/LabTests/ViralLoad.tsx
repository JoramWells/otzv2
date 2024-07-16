import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Badge } from '@/components/ui/badge'
import moment from 'moment'
import React, { type Dispatch, type SetStateAction } from 'react'

interface JustificationOptions {
  label: string
  id: string
}

interface ViralLoadInputProps {
  vlResults: string
  setVLResults: Dispatch<SetStateAction<string>>
  dateOfVL: string
  setDateOfVL: Dispatch<SetStateAction<string>>
  dateOfNextVL: string
  setDateOfNextVL: Dispatch<SetStateAction<string>>
  vlJustification: string
  setVLJustification: Dispatch<SetStateAction<string>>
  justificationOptions: JustificationOptions[]
}

const currentDate = moment('YYYY-MM-DD')

const ViralLoad = ({ vlResults, setVLResults, dateOfVL, setDateOfVL, dateOfNextVL, setDateOfNextVL, setVLJustification, vlJustification, justificationOptions }: ViralLoadInputProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 border border-s-slate-200 rounded-lg">
      <CustomInput
        label="Results"
        placeholder="Enter VL Results"
        type="number"
        value={vlResults}
        onChange={setVLResults}
      />

      <div>
        <div>
          <p>Date</p>
          {}
        </div>
        <div className="flex space-x-2 justify-between items-center relative border p-4 bg-slate-50">
          <div className="absolute top-4 right-4 left-8">
            {currentDate.isSame(dateOfVL, 'month')
              ? (
              <Badge>Valid</Badge>
                )
              : (
              <Badge>Invalid</Badge>
                )}
          </div>
          <CustomInput
            label="Current Date"
            type="date"
            value={dateOfVL}
            onChange={setDateOfVL}
          />
          <span className="mt-8">-</span>

          <CustomInput
            label="Next Date"
            type="date"
            value={dateOfNextVL}
            onChange={setDateOfNextVL}
          />
          <div>
            <p>Duration</p>
          </div>
        </div>
      </div>
      <CustomSelect
        label="Reason"
        data={justificationOptions}
        value={vlJustification}
        onChange={setVLJustification}
      />

    </div>
  )
}

export default ViralLoad
