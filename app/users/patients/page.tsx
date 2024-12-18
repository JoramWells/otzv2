/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import debounce from 'lodash/debounce'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { patientColumns } from './_components/columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { Badge } from '@/components/ui/badge'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useUserContext } from '@/context/UserContext'
import { useGetHospitalQuery } from '@/api/hospital/hospital.api'
import usePreprocessData from '@/hooks/usePreprocessData'
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

  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const tab = searchParams.get('tab')
  const casemanagerParam = searchParams.get('casemanager')
  const [pageSize, setPageSize] = useState(1)
  const [caseManager, setCaseManager] = useState('')
  const { authUser, hospitalID } = useUserContext()

  const { data: hData } = useGetHospitalQuery(authUser?.hospitalID as string, {
    skip: !authUser?.hospitalID
  })

  const [hospitalName, setHospitalName] = useState('')
  useEffect(() => {
    if (hData) {
      setHospitalName(hData?.hospitalName)
    }
  }, [hData])

  const [tabValue, setTabValue] = useState(tab)

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

  const { data: responseData, isLoading } = useGetAllPatientsQuery(
    {
      hospitalID: (authUser?.role !== 'admin') ? (hospitalID as string) : '',
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search,
      calHIVQuery: tabValue as string,
      casemanager: casemanagerParam
    },
    {
      skip: !hospitalID && !tabValue && tabValue === tab
    }
  )

  const { data: userData } = useGetAllUsersQuery({
    // page: Number(page) ?? 1,
    // pageSize: 10,
    hospitalName,
    searchQuery: search
  },
  {
    skip: !(hospitalName.length > 0)
  }
  )

  const caseManagerOptions = useCallback(() => {
    return userData?.data?.map((item) => ({
      id: `${item?.firstName} ${item?.middleName}`,
      label: `${item?.firstName} ${item?.middleName}`
    }))
  }, [userData])()

  const { data, total } = usePreprocessData(responseData)

  useEffect(() => {
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
          label={`Page No :- ${pageNumber(total as number, 10)}`}
          paramValue="page"
          onChange={setPageSize}
          value={`${pageSize}`}
          data={Array.from(
            { length: pageNumber(total as number, 10) },
            (_, index) => ({ id: `${index + 1}`, label: `${index + 1}` })
          )}
          placeholder="Page"
        />
        <CustomSelectParams
          label={`Case Managers :- ${pageNumber(total as number, 10)}`}
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
        <BreadcrumbComponent dataList={dataList2} />

      <div className="w-full p-2 pt-0 rounded-lg mt-2">
        <div className="bg-white rounded-lg border border-slate-200">
          <div
            className="p-2 pb-1 pt-1 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
          >
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-slate-700 text-[16px] ">{tabValue}</p>
              <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
                {total}
              </Badge>
            </div>
            <div className="flex flex-row items-center space-x-2">
              {caseManager
                ? (
                <Badge
                  className="hover: cursor-pointer flex flex-row space-x-1 items-center bg-purple-100
              border border-purple-200 hover:bg-purple-100 shadow-none text-purple-500 rounded-full"
                  onClick={() => clearCaseManager()}
                >
                  <XIcon size={12} />
                  <p>{caseManager}</p>
                </Badge>
                  )
                : (
                <p className="text-[12px] font-bold text-slate-500">
                  No Filters
                </p>
                  )}
              <Button
                className="shadow-none bg-teal-600 hover:bg-teal-500"
                size={'sm'}
                // variant={'outline'}
                onClick={() => {
                  router.push('/users/patients/add-patients')
                }}
              >
                <PlusCircle size={14} className="mr-2" />
                New
              </Button>
            </div>
          </div>
          <CustomTable
            columns={patientColumns}
            data={data ?? []}
            total={total as number}
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
