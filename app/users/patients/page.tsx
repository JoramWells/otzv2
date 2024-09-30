/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
// import { Button } from '@/components/ui/button'
// import { PlusCircle } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { patientColumns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { type PatientAttributes } from 'otz-types'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const FilterComponent = () => {
  const [isMale, setIsMale] = useState(false)
  return (
    <CaseManagerDialog label={<ListFilter />}>
      <p>Select Age Range</p>
      <div>
        <p>Select gender</p>
        <CustomCheckbox label="All" value={isMale} onChange={setIsMale} />
        <CustomCheckbox label="Male" value={isMale} onChange={setIsMale} />
        <CustomCheckbox label="Female" value={isMale} onChange={setIsMale} />
      </div>

      <div>
        <p>Population Type</p>
        <CustomCheckbox
          label="Fisher Folk"
          value={isMale}
          onChange={setIsMale}
        />
        <CustomCheckbox
          label="General Population"
          value={isMale}
          onChange={setIsMale}
        />
        <CustomCheckbox label="PWID" value={isMale} onChange={setIsMale} />
      </div>

      <div>
        <p>Entry Point</p>
        <CustomCheckbox label="Inpatient" value={isMale} onChange={setIsMale} />
      </div>
      <p>Marital Status</p>
    </CaseManagerDialog>
  )
}

const Patients = () => {
  // const datax = await getPatients()
  const { data, isLoading } = useGetAllPatientsQuery()

  const filteredArray: PatientAttributes[] = data ? [...data] : []
  filteredArray.sort(
    (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
  )

  // console.log(data, 'dtx')

  const router = useRouter()

  return (
    <div className="w-full">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between items-center bg-white p-2 pl-4 pr-4 mt-2">
        <div>
          <h2 className="font-bold text-slate-700">Patients</h2>
          <p className="text-slate-500 text-[14px] ">
            Manage Registered Patients
          </p>
        </div>

        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
          onClick={() => {
            router.push('/users/patients/add-patients')
          }}
        >
          <PlusCircle size={15} className="mr-2" />
          New Patient
        </Button>
      </div>

        <div className="bg-white w-full p-4 rounded-lg mt-2">
          <CustomTable
            columns={patientColumns}
            data={filteredArray || []}
            isLoading={isLoading}
            filter={<FilterComponent />}
            // isSearch
          />
        </div>
    </div>
  )
}

export default Patients
