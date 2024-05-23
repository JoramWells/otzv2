import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface HeaderTitleProps {
  title: string
  link: string
  label: string
}

const HeaderTitle = ({ title, link, label = '' }: HeaderTitleProps) => {
  const [patientID, setPatientID] = useState('')
  const { data: patientData } = useGetAllPatientsQuery()
  const router = useRouter()

  const dataOptions = useCallback(() => {
    return patientData?.map((item: any) => ({
      id: item.id,
      label: item.firstName
    }))
  }, [patientData])

  return (
    <div className="p-2 pl-4 pr-2 bg-white flex flex-row justify-between items-center   mt-2">
      <h1 className="text text-xl font-bold text-slate-700">{title} </h1>
      <CaseManagerDialog label={label}>
        <CustomSelect
          label="Select Patient Name"
          value={patientID}
          onChange={setPatientID}
          data={dataOptions()}
        />
        <Button
          className="bg-teal-600 hover:bg-teal-700 shadow-none"
          disabled={patientID.length === 0}
          onClick={() => {
            router.push(`${link}/${patientID}`)
          }}
        >
          <PlusCircleIcon className="mr-2" size={18} />
          Create New Enrollment
        </Button>
      </CaseManagerDialog>
    </div>
  )
}

export default HeaderTitle
