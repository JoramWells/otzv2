/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'
import { useGetAllOTZEnrollmentsQuery } from '../../../api/enrollment/otzEnrollment.api'
import { otzColumns } from './column'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'

const categoryList = [
  {
    id: 2,
    label: 'OTZ'
  },
  {
    id: 4,
    label: 'OVC'
  },
  {
    id: 5,
    label: 'PAMA'
  },
  {
    id: 6,
    label: 'PMTCT'
  }
]

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'enrollments',
    link: 'enrollments'
  }
]

const Page = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const [patientID, setPatientID] = useState('')
  const { data: patientData } = useGetAllPatientsQuery()
  const { data, isLoading } = useGetAllOTZEnrollmentsQuery()
  const router = useRouter()

  const dataOptions = useCallback(() => {
    return patientData?.map((item: any) => ({
      id: item.id, label: item.firstName
    }))
  }, [patientData])

  console.log(data, 'try')

  useEffect(() => {
    if (tab === null) {
      setValue('otz')
    }
  }, [tab])

  return (
    <div className="p-4 flex flex-col space-y-2">
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      {value === 'otz' && (
        <div className="bg-white p-2 w-full rounded-lg">
          <div className="w-full flex justify-end mb-2">
            <CaseManagerDialog label="Create New OTZ Enrollment">
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
                  router.push(`/users/enrollment/enroll-otz/${patientID}`)
                }}
              >
                <PlusCircleIcon className="mr-2" size={18} />
                Create New Enrollment
              </Button>
            </CaseManagerDialog>
          </div>
          <CustomTable
            columns={otzColumns}
            data={data || []}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}

export default Page
