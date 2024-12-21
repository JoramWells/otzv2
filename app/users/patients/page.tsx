/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useCallback, useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { PlusCircle, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { patientColumns } from './_components/columns'
import { Badge } from '@/components/ui/badge'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useUserContext } from '@/context/UserContext'
import { useGetHospitalQuery } from '@/api/hospital/hospital.api'
import usePreprocessData from '@/hooks/usePreprocessData'
import PageTableContainer from '@/app/_components/table/PageTableContainer'
import useSearch from '@/hooks/useSearch'
import PatientFilter from './_components/PatientFilter'
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
    link: ''
  }
]

const Patients = () => {
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

  useSearch({ search, setSearch })

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
        <PageTableContainer
          columns={patientColumns}
          data={data}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          filter={<PatientFilter
            age={tabValue}
            caseManager={caseManager}
            caseManagerOptions={caseManagerOptions}
            pageSize={pageSize}
            setAge={setTabValue}
            setCaseManager={setCaseManager}
            setPageSize={setPageSize}
            total={total}
            />}
          title={tabValue as string}
          total={total as number}
          rightLabel={
            <>
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
                className="shadow-none bg-teal-600 hover:bg-teal-500 m-0"
                size={'sm'}
                // variant={'outline'}
                onClick={() => {
                  router.push('/users/patients/add-patients')
                }}
              >
                <PlusCircle size={14} className="mr-2" />
                New
              </Button>
            </>
          }
        />
      </div>
    </>
  )
}

export default Patients
