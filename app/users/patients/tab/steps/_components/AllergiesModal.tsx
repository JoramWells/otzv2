/* eslint-disable @typescript-eslint/no-misused-promises */
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '@/components/forms/CustomInput'
import { useAddPatientAllergyMutation, useGetPatientAllergyQuery } from '@/api/medicalfile/patientAllergy.api'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { tertiaryColor } from '@/constants/color'
const AllergiesModal = ({ patientID }: { patientID: string }) => {
  const [addAllergy, { isLoading }] = useAddPatientAllergyMutation()

  const { data: allergyData } = useGetPatientAllergyQuery(patientID)

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
  console.log(allergyData, 'elle')
  return (
      <div className={`rounded-lg bg-[${tertiaryColor}] p-2 w-full flex justify-between`}>
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

  )
}

export default AllergiesModal
