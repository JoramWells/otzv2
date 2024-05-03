import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Medical = () => {
  const [isMedicated, setIsMedicated] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-50 mt-4 rounded-lg p-4">
      <p className="font-bold text-lg mb-2">No Medication history</p>
      <CaseManagerDialog label="Add" description="Update Medication">
        <div
        className='flex flex-col space-y-4 w-full'
        >
          <CustomCheckbox
            label="Any medication taken before?"
            value={isMedicated}
            onChange={setIsMedicated}
          />

          <CustomCheckbox
            label="Adverse Drugs reaction?"
            description="Patient has any adverse Drugs reaction"
            value={isMedicated}
            onChange={setIsMedicated}
          />
          <Button className="shadow-none bg-teal-600 hover:bg-teal-700">
            Add
          </Button>
        </div>
      </CaseManagerDialog>
    </div>
  )
}

export default Medical
