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
  id: string
  label: string
}

const SelectPatientDialog = ({ link = '', label = 'Create', data }: SelectPatientDialogProps) => {
  const router = useRouter()
  const [patientID, setPatientID] = useState<SingleValue<SelectOptions>>(null)

  return (
    <CaseManagerDialog label={label}>
      <Select
      value={patientID}
      onChange={setPatientID}
      options={data}
      />

      <Button className='shadow-none bg-slate-200 text-slate-700 font-bold hover:bg-slate-100'
      onClick={() => { router.push(`${link}/${patientID?.id}`) }}
      >Continue</Button>
    </CaseManagerDialog>
  )
}

export default SelectPatientDialog
