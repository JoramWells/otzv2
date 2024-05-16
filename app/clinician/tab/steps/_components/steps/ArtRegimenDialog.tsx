/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddArtPrescriptionMutation } from '@/api/art/artPrescription.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import { Button } from '@/components/ui/button'
import { calculateAge } from '@/utils/calculateAge'
import { InfoIcon, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CustomInput from '@/components/forms/CustomInput'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'

const ArtRegimenDialog = ({ patientID }: { patientID: string }) => {
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { data: patientData } = useGetPatientQuery(patientID)

  const [startDate, setStartDate] = useState(new Date())

  const { data } = useGetAllArtRegimenQuery()
  const { data: vsData } = useGetVitalSignQuery(appointmentID)
  const [regimenLine, setRegimenLine] = useState('first line')
  const [isStandardRegimen, setIsStandardRegimen] = useState(false)
  const [isNonStandardRegimen, setIsNonStandardRegimen] = useState(false)
  const [artRegimen, setArtRegimen] = useState('')
  const [nonStandardArtRegimen, setNonStandardArtRegimen] = useState('')
  const regimenOptions = useCallback(() => {
    const tempData = data?.filter((item: any) => item.ArtCategory.artPhase.toString().toLowerCase().includes(regimenLine.toLowerCase()))

    return tempData?.map((item: any) => ({
      id: item.id,
      label: item.artName
    }))
  }, [data, regimenLine])

  const [addArtPrescription, { isLoading }] = useAddArtPrescriptionMutation()

  const inputValues = {
    patientID,
    regimen: artRegimen,
    line: regimenLine,
    startDate,
    isStandard: isStandardRegimen
  }

  return (
    <CaseManagerDialog label="NEW ART">
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex w-full justify-end">
          <InfoIcon size={18} />
        </div>
        <p>Age {patientData && calculateAge(patientData?.dob)} years</p>
        <p>Weight {vsData?.weight} kg </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div>
          <CustomSelect
            label="Regimen Line"
            value={regimenLine}
            onChange={setRegimenLine}
            data={[
              {
                id: 'first Line',
                label: 'First Line'
              },
              {
                id: 'second Line',
                label: 'Second Line'
              },
              {
                id: 'third Line',
                label: 'Third Line'
              }
            ]}
          />
        </div>

        <CustomCheckbox
          label="Standard Regimen"
          value={isStandardRegimen}
          onChange={setIsStandardRegimen}
        />

        {isStandardRegimen && (
          <div>
            <CustomSelect
              value={artRegimen}
              onChange={setArtRegimen}
              data={regimenOptions()}
            />
          </div>
        )}

        <CustomCheckbox
          label="Non Standard Regimen"
          value={isNonStandardRegimen}
          onChange={setIsNonStandardRegimen}
        />
        {isNonStandardRegimen && (
          <div>
            <CustomSelect
              value={nonStandardArtRegimen}
              onChange={setNonStandardArtRegimen}
              data={[
                {
                  id: 'lopinavir',
                  label: 'Lopinavir'
                }
              ]}
            />
          </div>
        )}
      </div>

      <CustomInput
        label="Start Date"
        type="date"
        value={startDate}
        onChange={setStartDate}
      />
      <Button
        className="bg-slate-100 text-slate-700 shadow-none hover:bg-slate-50"
        onClick={async () => await addArtPrescription(inputValues)}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
        Save
      </Button>
      <CaseManagerDialog
      label='Prescribe Regimen'
      >Presc</CaseManagerDialog>
    </CaseManagerDialog>
  )
}

export default ArtRegimenDialog
