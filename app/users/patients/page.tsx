/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { type UserInterface, type PatientAttributes } from 'otz-types'
import debounce from 'lodash/debounce'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { useSession } from 'next-auth/react'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { patientColumns } from './_components/columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Badge } from '@/components/ui/badge'
import { useGetAllUsersQuery } from '@/api/users/users.api'
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

const Patients = () => {
  // const datax = await getPatients()

  const { data: session } = useSession()

  const [user, setUser] = useState<UserInterface>()
  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()
  const [patientData, setPatientData] = useState<PatientAttributes[] | undefined>([])
  const [patientTotal, setPatientTotal] = useState<number>(0)
  const page = searchParams.get('page')
  const tab = searchParams.get('tab')
  const casemanagerParam = searchParams.get('casemanager')
  const [pageSize, setPageSize] = useState(1)
  const [caseManager, setCaseManager] = useState('')

  const [tabValue, setTabValue] = useState(tab)

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

  const { data, isLoading } = useGetAllPatientsQuery(
    {
      hospitalID: user?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search,
      calHIVQuery: tabValue as string,
      casemanager: casemanagerParam
    },
    {
      skip: !user?.hospitalID && !tabValue && tabValue === tab
    }
  )

  const { data: userData } = useGetAllUsersQuery({
    // page: Number(page) ?? 1,
    // pageSize: 10,
    searchQuery: search
  })

  const caseManagerOptions = useCallback(() => {
    return userData?.data?.map((item) => ({
      id: `${item?.firstName} ${item?.middleName}`,
      label: `${item?.firstName} ${item?.middleName}`
    }))
  }, [userData])()

  useEffect(() => {
    if (data) {
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }
    if (tab === null) {
      setTabValue('All')
    }
  }, [data, tab])

  const router = useRouter()

  const pageNumber = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize)
  }

  function AgeFilter () {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <CustomSelectParams
          label="Age (years)"
          onChange={setTabValue}
          paramValue="tab"
          value={tabValue as string}
          data={[
            {
              id: 'All',
              label: 'All'
            },
            {
              id: '0-9 years',
              label: '01-09'
            },
            {
              id: '10-14 years',
              label: '10-14'
            },
            {
              id: '15-20 years',
              label: '15-19'
            },
            {
              id: '20 years',
              label: '20-24'
            }
          ]}
          placeholder="Age"
        />
        <CustomSelectParams
          label={`Page No :- ${pageNumber(patientTotal, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from(
            { length: pageNumber(patientTotal, 10) },
            (_, index) => ({ id: `${index + 1}`, label: `${index + 1}` })
          )}
          placeholder="Page"
        />
        <CustomSelectParams
          label={`Page No :- ${pageNumber(patientTotal, 10)}`}
          paramValue="casemanager"
          onChange={setCaseManager}
          value={caseManager}
          data={caseManagerOptions ?? []}
          placeholder="Case Manager"
        />

      </div>
    )
  }
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams.toString())
  const clearCaseManager = () => {
    setCaseManager('')
    params.set('casemanager', '')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className="relative">
        <BreadcrumbComponent dataList={dataList2} />

        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none absolute right-2 top-2
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
        <div className="bg-white rounded-lg border border-slate-200">
          <div
            className="p-4 pb-2 pt-2 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className='flex flex-row space-x-2 items-center' >
              <p className="text-slate-700 text-[16px] ">{tabValue}</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {patientTotal}
              </Badge>
            </div>
            {caseManager && <Badge
            className='hover: cursor-pointer bg-slate-50 border border-slate-200 hover:bg-slate-100 shadow-none text-black'
            onClick={() => clearCaseManager()}
            >{caseManager}</Badge>}
          </div>
          <CustomTable
            columns={patientColumns}
            data={patientData ?? []}
            total={patientTotal}
            isLoading={isLoading}
            search={search}
            setSearch={setSearch}
            filter={<AgeFilter />}

            // isSearch
          />
        </div>
      </div>
    </>
  )
}

export default Patients
