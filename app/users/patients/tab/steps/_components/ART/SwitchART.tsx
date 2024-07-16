import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'

interface RegimenOptionsProps {
  id: string
  label: string
}

interface SwitchArtInputProps {
  regimenOptions: RegimenOptionsProps[]
  reasonOptions: ReasonOptionsProps[]
}

interface ReasonOptionsProps {
  id: string
  label: string
  reasonID: string
}

const SwitchART = ({
  regimenOptions, reasonOptions
}: SwitchArtInputProps) => {
  const [switchReason, setSwitchReason] = useState('')
  const [artName, setArtName] = useState('')
  const [reasonID, setReasonID] = useState('')

  const switchReasons = useCallback(() => {
    const tempData = reasonOptions.filter((item: any) =>
      item.reasonID.toLowerCase().includes(reasonID.toLowerCase())
    )
    return tempData.map((item) => ({
      id: item.label,
      label: item.label
    }))
  }, [reasonID, reasonOptions])
  return (
    <div className="flex flex-col space-y-4 border border-s-slate-200 rounded-lg p-4">
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
      <Button className="bg-slate-200 hover:bg-slate-100 shadow-none text-black">
        Switch Regimen
      </Button>
    </div>
  )
}

export default SwitchART
