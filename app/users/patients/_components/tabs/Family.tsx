import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Family = () => {
  const [noOfFamilyMembers, setNoOfFamilyMembers] = useState('')
  const [noOfFamilyMembersAlive, setNoOfFamilyMembersAlive] = useState('')
  const [familyWithChronicIllness, setFamilyWithChronicIllness] = useState<boolean>(false)
  const [isFamilyDeath, setIsFamilyDeath] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-50 mt-4 rounded-lg p-4">
      <p className="font-bold text-lg mb-2">No Family history</p>
      <CaseManagerDialog label="Add" description="Add Family history">
        <div
        className='w-full flex flex-col space-y-4'
        >
          <CustomInput
            label="Number of family members"
            value={noOfFamilyMembers}
            onChange={setNoOfFamilyMembers}
          />
          <CustomInput
            label="Number of members alive"
            value={noOfFamilyMembersAlive}
            onChange={setNoOfFamilyMembersAlive}
          />
          <CustomCheckbox
            label="Family member wit chronic illness?"
            value={familyWithChronicIllness}
            onChange={setFamilyWithChronicIllness}
          />
          <CustomCheckbox
            label="history of Family member death ?"
            value={isFamilyDeath}
            onChange={setIsFamilyDeath}
          />
          <Button className="bg-teal-600 hover:bg-teal-700 shadow-none">
            Add
          </Button>
        </div>
      </CaseManagerDialog>
    </div>
  )
}

export default Family
