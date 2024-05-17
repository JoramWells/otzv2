/* eslint-disable @typescript-eslint/no-misused-promises */
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'
import { useAddPatientAllergyMutation } from '@/api/medicalfile/patientAllergy.api'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
const AllergiesModal = ({ patientID }: { patientID: string }) => {
  const [addAllergy, { isLoading }] = useAddPatientAllergyMutation()

  const [allergyName, setAllergyName] = useState('')
  const [allergyReaction, setAllergyReaction] = useState('')
  const [severity, setSeverity] = useState('')
  const [onSetDate, setOnSetDate] = useState('')

  const allergyInputs = {
    allergyName,
    allergyReaction,
    severity,
    patientID,
    onSetDate
  }
  return (
    <div className="w-1/4 p-2 flex flex-col space-y-4">
      <div className="border rounded-lg bg-white p-4 w-full">
        <p className="font-bold text-lg">Allergies</p>

        <CaseManagerDialog label="Update">
          <CustomSelect
            label="Select Allergy"
            value={allergyName}
            onChange={setAllergyName}
            data={[
              {
                id: 'caffeine',
                label: 'Caffeine'
              }
            ]}
          />

          {/*  */}
          <CustomSelect
            label="Select Reaction"
            value={allergyReaction}
            onChange={setAllergyReaction}
            data={[
              {
                id: 'anaemia',
                label: 'Anaemia'
              }
            ]}
          />

          {/*  */}
          <CustomSelect
            label="Severity"
            value={severity}
            onChange={setSeverity}
            data={[
              {
                id: 'mild',
                label: 'Mild'
              },
              {
                id: 'moderate',
                label: 'Moderate'
              },
              {
                id: 'severe',
                label: 'Severe'
              },
              {
                id: 'fatal',
                label: 'Fatal'
              }
            ]}
          />

          <CustomInput
            label="Onset"
            type="date"
            onChange={setOnSetDate}
            value={onSetDate}
          />

          <Button
            className="bg-slate-200 text-black shadow-none hover:bg-slate-100"
            onClick={async () => await addAllergy(allergyInputs)}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Update
          </Button>
        </CaseManagerDialog>
      </div>

      {/*  */}
      <div className="border rounded-lg bg-white p-4">
        <p className="font-bold text-lg">Chronic Illness and Cormobidities</p>

        <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
          Update
        </Button>
      </div>

      {/*  */}
      <div className="border rounded-lg bg-white p-4">
        <p className="font-bold text-lg">Adverse Drug Reactions </p>

        <Button className="w-full bg-slate-200 text-black shadow-none hover:bg-slate-100">
          Update
        </Button>
      </div>
    </div>
  )
}

export default AllergiesModal
