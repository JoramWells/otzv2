/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAddArtPrescriptionMutation } from '@/api/art/artPrescription.api'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface RegimenOptionsProps {
  id: string
  label: string
}

interface SwitchArtInputProps {
  regimenOptions: RegimenOptionsProps[]
  reasonOptions: ReasonOptionsProps[]
  patientID: string
}

interface ReasonOptionsProps {
  id: string
  label: string
  reasonID: string
}

const SwitchART = ({
  regimenOptions, reasonOptions, patientID
}: SwitchArtInputProps) => {
  const [switchReason, setSwitchReason] = useState('')
  const [artName, setArtName] = useState('')
  const [reasonID, setReasonID] = useState('')
  const [regimenLine, setRegimenLine] = useState('')
  const [addArtPrescription, { isLoading, data: addPrescriptionData }] =
    useAddArtPrescriptionMutation()

  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')

  const switchReasons = useCallback(() => {
    const tempData = reasonOptions.filter((item: any) =>
      item.reasonID.toLowerCase().includes(reasonID.toLowerCase())
    )
    return tempData.map((item) => ({
      id: item.label,
      label: item.label
    }))
  }, [reasonID, reasonOptions])

  //
  const inputValues = {
    patientID,
    regimen: artName,
    patientVisitID: appointmentID,
    line: regimenLine,
    startDate: new Date(),
    isStandard: true
  }

  return (
    <div className="flex flex-col space-y-4 border border-s-slate-200 rounded-lg p-4">
      {/*  */}
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

      {/*  */}

      <CustomSelect
        label="Art Name"
        value={artName}
        onChange={setArtName}
        data={regimenOptions}
      />
      <CustomSelect
        label="Reason"
        value={reasonID}
        onChange={setReasonID}
        data={[
          {
            id: 'Substitution',
            label: 'Substitution'
          },
          {
            id: 'Switch',
            label: 'Switch'
          }
        ]}
      />
      <CustomSelect
        label="Switch Reason"
        value={switchReason}
        onChange={setSwitchReason}
        data={switchReasons()}
      />
      <Button
        className="bg-slate-200 hover:bg-slate-100 shadow-none text-black"
        onClick={async () => await addArtPrescription(inputValues)}
      >
        {isLoading && <Loader2 className="mr-2 animate-spin" size={18} />}
        Switch Regimen
      </Button>
    </div>
  )
}

export default SwitchART
