import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

const SelectPatientDialog = () => {
  const router = useRouter()
  const [patientID, setPatientID] = useState('')
  const { data: patientData } = useGetAllPatientsQuery()

  const patientDataOptions = useCallback(() => {
    return patientData?.map((item: any) => ({
      id: item.id, label: item.firstName
    }))
  }, [patientData])

  return (
    <CaseManagerDialog label="Create NEW PAMA">
      <CustomSelect
        label="Select Patient Name"
        value={patientID}
        onChange={setPatientID}
        data={patientDataOptions()}
      />
      <Button className='shadow-none bg-slate-200 text-slate-700 font-bold hover:bg-slate-100'
      onClick={() => { router.push(`/enrollment/enroll-pama/${patientID}`) }}
      >Continue</Button>
    </CaseManagerDialog>
  )
}

export default SelectPatientDialog
