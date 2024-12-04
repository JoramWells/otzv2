import { useGetAllVlJustificationQuery } from '@/api/viraload/vlJustification.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
// import { Badge } from '@/components/ui/badge'
import moment from 'moment'
import React, { useCallback, type Dispatch, type SetStateAction } from 'react'

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



const ViralLoad = ({ vlResults, setVLResults, dateOfVL, setDateOfVL, dateOfNextVL, setDateOfNextVL, setVLJustification, vlJustification, justificationOptions }: ViralLoadInputProps) => {
    const { data: vlJustificationData } = useGetAllVlJustificationQuery();
    const vlReasonOptions = useCallback(() => {
      return vlJustificationData?.map((item: any) => ({
        id: item?.justification,
        label: item?.justification,
      }));
    }, []);
  return (
    <div className="flex flex-col space-y-4 p-4 border border-dashed border-s-slate-200 rounded-lg">
      <CustomInput
        label="Results"
        placeholder="Enter VL Results"
        description='Viral load results'
        type="number"
        value={vlResults}
        onChange={setVLResults}
      />

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
            description='Active viral load date.'
            type="date"
            value={dateOfVL}
            onChange={setDateOfVL}
          />
          <span className="mt-8 text-slate-500">-</span>

          <CustomInput
            label="Next VL Date"
            description='Date of the next viral load.'
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
      <CustomSelect
        label="Reason"
        description='Select the main reason for this viral load.'
        data={vlReasonOptions()}
        value={vlJustification}
        onChange={setVLJustification}
      />

    </div>
  )
}

export default ViralLoad
