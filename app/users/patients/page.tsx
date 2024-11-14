/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
// import { Button } from '@/components/ui/button'
// import { PlusCircle } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { patientColumns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { type UserInterface, type PatientAttributes } from 'otz-types'
import { calculateAge } from '@/utils/calculateAge'
import CustomTab from '@/components/tab/CustomTab'
import { useSession } from 'next-auth/react'
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

  const [user, setUser] = useState<UserInterface>()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data, isLoading } = useGetAllPatientsQuery({
    hospitalID: user?.hospitalID as string
  })
  const filteredArray: PatientAttributes[] = data ? [...data] : []
  filteredArray.sort(
    (a, b) => new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime()
  )

  const otzPatients = filteredArray.filter(item => calculateAge(item.dob) < 25)

  const zeroToNine = otzPatients.filter((item) => calculateAge(item.dob) < 9)
  const tenToFourteen = otzPatients.filter(
    (item) => calculateAge(item.dob) > 10 && calculateAge(item.dob) <
 14)

  const fifteenToNineteen = otzPatients.filter(
    (item) => calculateAge(item.dob) > 15 && calculateAge(item.dob) < 19
  )

  const twentyPlus = otzPatients.filter(
    (item) => calculateAge(item.dob) > 20
  )

  // console.log(data, 'dtx')

  const router = useRouter()

  const categoryList = [
    {
      id: 0,
      label: 'All',
      count: otzPatients.length
    },
    {
      id: 1,
      label: '0-9 years',
      count: zeroToNine.length
    },
    {
      id: 2,
      label: '10-14 years',
      count:
      tenToFourteen.length
    },
    {
      id: 3,
      label: '15-19 years',
      count: fifteenToNineteen.length
    },
    {
      id: 4,
      label: '20+ years',
      count: twentyPlus.length
    }
  ]

  const [tabValue, setTabValue] = useState('all')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex flex-row justify-between items-center bg-white  mt-2 pr-2">
        <div>
          <p className="mt-2 ml-2 text-[14px] font-semibold">Age Ranges</p>
          <CustomTab
            categoryList={categoryList}
            setValue={setTabValue}
            value={tabValue}
          />
        </div>
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
          <div className="p-2 bg-white rounded-lg">
            <div className="mb-2">
              <p className="font-semibold text-[14px] ">All Patients</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 0 between 25 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={otzPatients || []}
              isLoading={isLoading}
              filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '0-9 years' && (
          <div className="p-2 bg-white rounded-lg">
            <div className="mb-2">
              <p className="font-semibold text-[14px] ">0 years -- 9 years</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 0 between 9 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={zeroToNine || []}
              isLoading={isLoading}
              filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '10-14 years' && (
          <div className="p-2 bg-white rounded-lg">
            <div className="mb-2">
              <p className="font-semibold text-[14px] ">10 years -- 14 years</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 10 between 14 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={tenToFourteen || []}
              isLoading={isLoading}
              filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '15-19 years' && (
          <div className="p-2 bg-white rounded-lg">
            <div className="mb-2">
              <p className="font-semibold text-[14px] ">15 years -- 19 years</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 15 between 19 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={fifteenToNineteen || []}
              isLoading={isLoading}
              filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}

        {/*  */}
        {tabValue === '20+ years' && (
          <div className="p-2 bg-white rounded-lg">
            <div className="mb-2">
              <p className="font-semibold text-[14px] ">20 years +</p>
              <p className="text-[12px] text-slate-500">
                A list of patient 20 years and above.
              </p>
            </div>
            <CustomTable
              columns={patientColumns}
              data={twentyPlus || []}
              isLoading={isLoading}
              filter={<FilterComponent />}
              // isSearch
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Patients
