/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomSelect, { type DataItem } from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type UserInterface } from 'otz-types'
import { useCallback, useEffect, useState } from 'react'

interface HeaderTitleProps {
  title: string
  link: string
  label: string
}

const HeaderTitle = ({ title, link, label = '' }: HeaderTitleProps) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()

  const [patientID, setPatientID] = useState('')
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data: patientData } = useGetAllPatientsQuery({
    hospitalID: user?.hospitalID as string
  })
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
          data={dataOptions() as DataItem[]}
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
