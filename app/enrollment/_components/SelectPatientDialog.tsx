/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import Select, { type SingleValue } from 'react-select'

interface SelectPatientDialogProps {
  label: ReactNode | string
  link: string
  data: SelectOptions[]
}

interface SelectOptions {
  id?: string
  label?: string
}

const SelectPatientDialog = ({ link = '', label = 'Create', data }: SelectPatientDialogProps) => {
  const router = useRouter()
  const [patientID, setPatientID] = useState<SingleValue<SelectOptions>>(null)

  return (
    <CaseManagerDialog label={label} description="New Enrollment">
      <div
      className='p-4'
      >
        <p className="text-slate-500 text-[14px] text-capitalize ">
          Select a Patient to create {label}{' '}
        </p>
        <Select value={patientID} onChange={setPatientID} options={data} />

        <div className="w-full flex flex-row space-x-2">
          <Button
            className="shadow-none  flex-1"
            onClick={() => {
              router.push(`${link}/${patientID?.id}`)
            }}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            className={
              'shadow-none bg-slate-200  text-black font-bold hover:opacity-80   hover:bg-slate-100 flex-1'
            }
            onClick={() => {
              router.push(`${link}/${patientID?.id}`)
            }}
            disabled={!patientID}
          >
            Continue
          </Button>
        </div>
      </div>
    </CaseManagerDialog>
  )
}

export default SelectPatientDialog
