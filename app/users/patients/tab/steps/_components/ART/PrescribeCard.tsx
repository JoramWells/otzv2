/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/ban-types */
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import React, { type Dispatch, type SetStateAction } from 'react'

interface PrescriptionCardProps {
  noOfPill: number
  setNoOfPills: Dispatch<SetStateAction<number>>

  //   no of times in a day
  frequency: string
  setFrequency: Dispatch<SetStateAction<string>>

  //   refill date, by default today
  refillDate: string
  setRefillDate: Dispatch<SetStateAction<string>>

  isLoadingSave: boolean
  savePrescription: () => {}
  handleBack: () => void
  handleNext: () => void
  prescriptionData: any
  addPrescriptionData: any
}

const PrescribeCard = ({
  noOfPill,
  setNoOfPills,
  frequency,
  setFrequency,
  refillDate,
  setRefillDate,
  isLoadingSave,
  savePrescription,
  handleBack,
  handleNext,
  prescriptionData,
  addPrescriptionData
}: PrescriptionCardProps) => {
  return (
    <div className="flex flex-col space-y-2  rounded-lg">
      <CustomInput
        label="Pills"
        description='The number of pills prescribed.'
        placeholder='Enter the number of pills.'
        onChange={setNoOfPills}
        value={noOfPill as unknown as string}
      />
      <CustomSelect
        label="Frequency"
        value={frequency as unknown as string}
        onChange={setFrequency}
        description='The prescribed number of times in a day the patient has to take medicine.'
        defaultValue='OD'
        data={[
          {
            id: '1',
            label: 'OD'
          },
          {
            id: '2',
            label: 'BD'
          }
        ]}
      />
      <CustomInput
        label="Refill Date"
        description='If no date is selected, default date is used for prescription.'
        onChange={setRefillDate}
        value={refillDate}
        type="date"
      />

      {/*  */}
      <div className="flex justify-end mt-4 space-x-4 w-full  ">
        <Button
          onClick={() => {
            handleBack()
          }}
          className="shadow-none text-slate-500"
        variant='outline'
        size={'sm'}
        >
          <ChevronsLeft className='mr-2' size={18} />
          Back
        </Button>
        {prescriptionData
          ? (
          <Button
            className=" shadow-none  text-slate-500"
            variant='outline'
            onClick={() => {
              handleNext()
            }}
            size={'sm'}
          >
            Next
            <ChevronsRight className='ml-2' size={18} />
          </Button>
            )
          : (
          <Button
            onClick={() => savePrescription()}
            disabled={isLoadingSave}
            className="bg-teal-600 text-white shadow-none hover:bg-teal-500"
            size={'sm'}
          >
            {isLoadingSave && <Loader2 className="mr-2" size={18} />}
            Save
          </Button>
            )}
      </div>

      {/* save prescription */}
    </div>
  )
}

export default PrescribeCard
