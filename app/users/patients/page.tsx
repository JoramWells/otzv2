/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
// import { Button } from '@/components/ui/button'
// import { PlusCircle } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { patientColumns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { type PatientAttributes } from 'otz-types'
import { calculateAge } from '@/utils/calculateAge'
import CustomTab from '@/components/tab/CustomTab'
import { useUserContext } from '@/context/UserContext'
import debounce from 'lodash/debounce'
import axios from 'axios'
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

export interface ExtendedPatientAttribute {
  data: PatientAttributes[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

const Patients = () => {
  // const datax = await getPatients()

  const { authUser } = useUserContext()
  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()
  const [patientData, setPatientData] = useState<PatientAttributes[] | undefined>([])
  const [patientTotal, setPatientTotal] = useState<number | undefined>(0)
  const [loading, setLoading] = useState(false)

  async function fetchPatientData (hospitalID: string | undefined, page: number, pageSize: number, searchQuery: string | undefined): Promise<ExtendedPatientAttribute | undefined> {
    try {
      setLoading(true)
      const { data } = await axios.get<ExtendedPatientAttribute | undefined>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/patients/fetchAll`,
        {
          params: {
            hospitalID,
            page,
            pageSize,
            searchQuery
          }
        }
      )
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const page = searchParams.get('page')

  const debounceSearch = useMemo(() => {
    // setSearch(value)

    return debounce(async (value: string) => {
      const data = await fetchPatientData(authUser?.hospitalID, parseInt(page as string, 10), 10, value)
      setPatientData(data?.data)
      setPatientTotal(data?.total)
    }, 500)
  }, [authUser?.hospitalID, page])

  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])

  useEffect(() => {
    (async () => {
      if (page && authUser?.hospitalID) {
        const data = await fetchPatientData(authUser?.hospitalID, parseInt(page, 10), 10, '')
        setPatientData(data?.data)
        setPatientTotal(data?.total)
      }
    })()
  }, [authUser?.hospitalID, page, searchParams])

  // const { data, isLoading } = useGetAllPatientsQuery({
  //   hospitalID: authUser?.hospitalID as string,
  //   page: (page && (page as unknown as number)) ?? 1,
  //   pageSize: 10
  // })

  const otzPatients = patientData?.filter(item => calculateAge(item.dob) <= 25)

  console.log(patientData, 'otzPatients')

  const zeroToNine = otzPatients?.filter((item) => calculateAge(item.dob) <= 9)
  const tenToFourteen = otzPatients?.filter(
    (item) => calculateAge(item.dob) >= 10 && calculateAge(item.dob) <=
 14)

  const fifteenToNineteen = otzPatients?.filter(
    (item) => calculateAge(item.dob) >= 15 && calculateAge(item.dob) <= 19
  )

  const twentyPlus = otzPatients?.filter(
    (item) => calculateAge(item.dob) >= 20
  )

  // console.log(data, 'dtx')

  const router = useRouter()

  const categoryList = [
    {
      id: 0,
      label: 'All',
      count: otzPatients?.length
    },
    {
      id: 1,
      label: '0-9 years',
      count: zeroToNine?.length
    },
    {
      id: 2,
      label: '10-14 years',
      count:
      tenToFourteen?.length
    },
    {
      id: 3,
      label: '15-19 years',
      count: fifteenToNineteen?.length
    },
    {
      id: 4,
      label: '20+ years',
      count: twentyPlus?.length
    }
  ]

  const [tabValue, setTabValue] = useState('all')

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
          <div className="bg-white rounded-lg">
            <div className="p-4 pb-0">
              <p className="text-slate-700 text-[16px] ">All Patients</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 0 between 25 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={otzPatients ?? []}
              total={patientTotal}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
              // filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '0-9 years' && (
          <div className="bg-white rounded-lg">
            <div className="p-4 pb-0">
              <p className="text-slate-700 text-[16px] ">0 years -- 9 years</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 0 between 9 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={zeroToNine ?? []}
              total={patientTotal}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
              // filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '10-14 years' && (
          <div className="bg-white rounded-lg">
            <div className="p-4 pb-0">
              <p className="text-slate-700 text-[16px] ">
                10 years -- 14 years
              </p>
              <p className="text-[12px] text-slate-500">
                A list of patient 10 between 14 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={tenToFourteen ?? []}
              total={patientTotal}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
              // filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '15-19 years' && (
          <div className="bg-white rounded-lg">
            <div className="p-4 pb-0">
              <p className="text-slate-700 text-[16px] ">
                15 years -- 19 years
              </p>
              <p className="text-[12px] text-slate-500">
                A list of patient 15 between 19 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={fifteenToNineteen ?? []}
              total={patientTotal}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
              // filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '20+ years' && (
          <div className="bg-white rounded-lg">
            <div className="p-4 pb-0">
              <p className="font-slate-700 text-[16px] ">20 years +</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 20 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={twentyPlus ?? []}
              total={patientTotal}
              isLoading={loading}
              search={search}
              setSearch={setSearch}
              debounceSearch={debounceSearch}
              // filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Patients
