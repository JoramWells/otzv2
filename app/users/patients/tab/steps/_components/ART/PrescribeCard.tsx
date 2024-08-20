/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/ban-types */
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import React, { type Dispatch, type SetStateAction } from 'react'

interface PrescriptionCardProps {
  noOfPill: string
  setNoOfPills: Dispatch<SetStateAction<string>>

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
    <div className="flex flex-col space-y-4  border  rounded-lg p-4">
      <CustomInput
        label="Number of Pills"
        onChange={setNoOfPills}
        value={noOfPill as unknown as string}
      />
      <CustomSelect
        label="Frequency"
        value={frequency as unknown as string}
        onChange={setFrequency}
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
        onChange={setRefillDate}
        value={refillDate}
        type="date"
      />

      {/*  */}
      <div className="flex justify-end mt-4 space-x-4 w-full absolute bottom-2 right-0.5 ">
        <Button
          onClick={() => {
            handleBack()
          }}
          className="shadow-none text-slate-500"
        variant='outline'
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
