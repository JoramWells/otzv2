import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
// import { Badge } from '@/components/ui/badge'
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

// const currentDate = moment('YYYY-MM-DD')

const ViralLoad = ({ vlResults, setVLResults, dateOfVL, setDateOfVL, dateOfNextVL, setDateOfNextVL, setVLJustification, vlJustification, justificationOptions }: ViralLoadInputProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 border border-dashed border-s-slate-200 rounded-lg">
      <CustomInput
        label="Results"
        placeholder="Enter VL Results"
        type="number"
        value={vlResults}
        onChange={setVLResults}
      />

      <div>
         <div className="flex space-x-2 justify-between items-center rounded-lg
         relative border p-4">
          {/* <div className="absolute top-4 right-4 left-8">
            {currentDate.isSame(dateOfVL, 'month')
              ? (
              <Badge>Valid</Badge>
                )
              : (
              <Badge>Invalid</Badge>
                )}
          </div> */}
          <CustomInput
            label="Current VL Date"
            type="date"
            value={dateOfVL}
            onChange={setDateOfVL}
          />
          <span className="mt-8 text-slate-500">-</span>

          <CustomInput
            label="Next VL Date"
            type="date"
            value={dateOfNextVL}
            onChange={setDateOfNextVL}
          />
          <div className='mt-5 text-slate-500 text-center' >
            <p>Duration</p>
            <p className='text-[14px] font-semibold' >
              {moment(dateOfNextVL).diff(dateOfVL, 'months')} months
            </p>
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
