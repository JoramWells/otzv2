/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllPMTCTPatientsQuery } from '@/api/patient/patients.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { type ReactNode, useCallback, useState } from 'react'
import Select, { type SingleValue } from 'react-select'

interface SelectPatientDialogProps {
  label: ReactNode | string
  link: string
}
interface Patient {
  id: string
  firstName: string
}

interface SelectOptions {
  id: string
  label: string
}

const SelectPatientDialog = ({ link = '', label = 'Create' }: SelectPatientDialogProps) => {
  const router = useRouter()
  const [patientID, setPatientID] = useState<SingleValue<SelectOptions>>(null)
  const { data: patientData } = useGetAllPMTCTPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return patientData?.map((item: Patient) => ({
      id: item.id, label: item.firstName
    })) || []
  }, [patientData])

  return (
    <CaseManagerDialog label={label}>
      <Select
      value={patientID}
      onChange={setPatientID}
      options={patientDataOptions()}
      />
      {/* <CustomSelect
        label="Select Patient Name"
        value={patientID}
        onChange={setPatientID}
        data={patientDataOptions()}
      /> */}
      <Button className='shadow-none bg-slate-200 text-slate-700 font-bold hover:bg-slate-100'
      onClick={() => { router.push(`${link}/${patientID?.id}`) }}
      >Continue</Button>
    </CaseManagerDialog>
  )
}

export default SelectPatientDialog
