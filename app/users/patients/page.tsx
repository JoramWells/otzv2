/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { type UserInterface, type PatientAttributes } from 'otz-types'
import CustomTab from '@/components/tab/CustomTab'
import debounce from 'lodash/debounce'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { useSession } from 'next-auth/react'
import AgeComponent from './_components/Homepage/AgeComponent'
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
    <CaseManagerDialog label={<ListFilter size={16} />}>
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

const Patients = ({ all }: { all: ReactNode }) => {
  // const datax = await getPatients()

  const { data: session } = useSession()

  const [user, setUser] = useState<UserInterface>()
  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()
  const [patientData, setPatientData] = useState<PatientAttributes[] | undefined>([])
  const [patientTotal, setPatientTotal] = useState<number>(0)
  const [tabValue, setTabValue] = useState('all')

  const page = searchParams.get('page')

  useEffect(() => {
    if (session) {
      setUser(session?.user as UserInterface)
    }
  }, [session])

  const debounceSearch = useMemo(() => {
    // setSearch(value)
    if (page !== null) {
      return debounce(async (value: string) => {
        setSearch(value)
      }, 500)
    }
  }, [page])

  useEffect(() => {
    debounceSearch?.(search)
    return () => debounceSearch?.cancel()
  }, [debounceSearch, search])

  const { data, isLoading } = useGetAllPatientsQuery({
    hospitalID: user?.hospitalID as string,
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search,
    calHIVQuery: tabValue
  },
  {
    skip: !user?.hospitalID
  }
  )

  useEffect(() => {
    if (data) {
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }
  }, [data])

  const zeroToNine = tabValue === '0-9 years' ? patientData : []
  const tenToFourteen = tabValue === '10-14 years' ? patientData : []

  const fifteenToNineteen = tabValue === '15-20 years' ? patientData : []

  const twentyPlus = tabValue === '20 years' ? patientData : []

  // console.log(data, 'dtx')

  const router = useRouter()

  const categoryList = [
    {
      id: 0,
      label: 'All'
      // count: patientTotal
    },
    {
      id: 1,
      label: '0-9 years'
      // count: zeroToNine?.length
    },
    {
      id: 2,
      label: '10-14 years'
      // count:
      // tenToFourteen?.length
    },
    {
      id: 3,
      label: '15-20 years'
      // count: fifteenToNineteen?.length
    },
    {
      id: 4,
      label: '20 years'
      // count: twentyPlus?.length
    }
  ]

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between items-center bg-white  mt-2 pr-2">
        <CustomTab
          categoryList={categoryList}
          setValue={setTabValue}
          value={tabValue}
        />
        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
          onClick={() => {
            router.push('/users/patients/add-patients')
          }}
          size={'sm'}
        >
          <PlusCircle size={15} className="mr-2" />
          New
        </Button>
      </div>

      <div className="w-full p-2 pt-0 rounded-lg mt-2">
        {tabValue === 'all' && (
          <AgeComponent
            title="All patients"
            data={patientData ?? []}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            total={patientTotal}
          />
        )}

        {/*  */}
        {tabValue === '0-9 years' && (
          <AgeComponent
            title="0 years -- 9 years"
            data={zeroToNine ?? []}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            total={patientTotal}
          />
        )}

        {/*  */}
        {tabValue === '10-14 years' && (
          <AgeComponent
            title="10 years -- 14 years"
            data={tenToFourteen ?? []}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            total={patientTotal}
          />
        )}

        {/*  */}
        {tabValue === '15-20 years' && (
          <AgeComponent
            title="15 years -- 20 years"
            data={fifteenToNineteen ?? []}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            total={patientTotal}
          />
        )}

        {/*  */}
        {tabValue === '20 years' && (

            <AgeComponent
              title="15 years -- 20 years"
              data={twentyPlus ?? []}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
              total={patientTotal}
            />
        )}
      </div>
    </>
  )
}

export default Patients
