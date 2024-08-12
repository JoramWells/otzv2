/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/ban-types */
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
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
      <div className="flex justify-end mt-4 space-x-4 w-full absolute bottom-4 right-4 ">
        <Button
          onClick={() => {
            handleBack()
          }}
          className="bg-slate-200 shadow-none text-slate-700 hover:bg-slate-100"
        >
          Back
        </Button>
        {prescriptionData || addPrescriptionData
          ? (
          <Button
            className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
            onClick={() => {
              handleNext()
            }}
          >
            Next
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
