import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Social = () => {
  const [isSmoker, setIsSmoker] = useState(false)
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-50 mt-4 rounded-lg p-4">
      <p className="font-bold text-lg mb-2">Social Status</p>
      <CaseManagerDialog label="Add New Status">
        <CustomCheckbox
          label="DO you smoke cigarettes?"
          value={isSmoker}
          onChange={setIsSmoker}
        />
        <label htmlFor="">Any history of drugs substance abuse?</label>
        <CustomCheckbox label="Yes" value={isSmoker} onChange={setIsSmoker} />
        <Button className="bg-teal-600 hover:bg-teal-700 shadow-none">
          Add
        </Button>
      </CaseManagerDialog>
    </div>
  )
}

export default Social
