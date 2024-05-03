import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const FamilyPlanning = () => {
  const [familyPanningMethod, setFamilyPanningMethod] = useState('')
  const [isCondom, setIsCondom] = useState<boolean>(false)
  const [isVasectomy, setIsVasectomy] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-50 mt-4 rounded-lg p-4">
      <p className="font-bold text-lg mb-2">No Family Panning</p>

      <CaseManagerDialog
        label="Add New Plan"
        description="Add New Family Panning Method"
      >
        <CustomSelect
          label="Select Family Panning Status"
          data={[
            {
              id: '1',
              label: 'On Family Panning'
            },
            {
              id: '2',
              label: 'Not Using Family Panning'
            },
            {
              id: '3',
              label: 'Wants Family Panning'
            }
          ]}
          value={familyPanningMethod}
          onChange={setFamilyPanningMethod}
        />

        <label htmlFor="">
          *If currently on family planning or wants family select methods
        </label>
        <CustomCheckbox
          label="Condoms"
          value={isCondom}
          onChange={setIsCondom}
        />
        <CustomCheckbox
          label="Vasectomy"
          value={isVasectomy}
          onChange={setIsVasectomy}
        />
        <Button className="bg-teal-600 hover:bg-teal-700">Add</Button>
      </CaseManagerDialog>
    </div>
  )
}

export default FamilyPlanning
