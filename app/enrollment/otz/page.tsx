/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { columns, patientColumns } from './columns'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'
import { Suspense, useCallback, useState } from 'react'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
    label: 'enrollments',
    link: '/enrollments'
  }
]

const tabList = [
  {
    id: 1,
    label: 'Pediatric'
  },
  {
    id: 2,
    label: 'OTZ'
  },
  {
    id: 3,
    label: 'OTZ Plus'
  },
  {
    id: 4,
    label: 'Adults'
  }
]

interface Patient {
  id: string
  firstName: string
}

const OTZ = () => {
  // const datax = await getPatients()
  const [tab, setTab] = useState('otz')
  const { authUser } = useUserContext()
  const { data } = useGetAllOTZEnrollmentsQuery({
    hospitalID: authUser?.hospitalID as string,
  })

  const { data: patientData } = useGetAllEligibleOTZPatientsQuery()

  console.log(data, 'hospitalID')

  const [value, setValue] = useState(1)

  return (
    <Suspense>
      <div className="">
        <BreadcrumbComponent dataList={dataList2} />
        <div className="flex p-2 w-full">
          {[
            { id: 1, label: 'Enrolled' },
            { id: 2, label: 'Not Enrolled' }
          ].map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {value === 1 && (
          <>
            <div className="w-full mt-4">
              <CustomTab value={tab} setValue={setTab} categoryList={tabList} />
            </div>

            <div className=" bg-white rounded-lg p-4">
              <p className="mb-2 text-lg text-slate-700 font-bold">
                OTZ Patients
              </p>
              <CustomTable columns={columns} data={data || []} />
            </div>
          </>
        )}

        {/*  */}
        {value === 2 && (
          <div
          className='p-4'
          >
            <div
            className='bg-white rounded-lg p-4'
            >
              <CustomTable columns={patientColumns} data={patientData || []} />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default OTZ
