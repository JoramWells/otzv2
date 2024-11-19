/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetAllOTZEnrollmentsQuery } from '@/api/enrollment/otzEnrollment.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CustomTab from '@/components/tab/CustomTab'
import { Suspense, useCallback, useState } from 'react'
import { useGetAllEligibleOTZPatientsQuery } from '@/api/patient/patients.api'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { columns, patientColumns } from './columns'
import { Badge } from '@/components/ui/badge'

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

interface Patient {
  id: string
  firstName: string
}

const OTZ = () => {
  // const datax = await getPatients()
  const { authUser } = useUserContext()
  const { data } = useGetAllOTZEnrollmentsQuery({
    hospitalID: authUser?.hospitalID as string,
  })

  // const { data: patientData } = useGetAllEligibleOTZPatientsQuery()

  const [value, setValue] = useState(1)

  return (
    <Suspense>
      <div className="">
        <BreadcrumbComponent dataList={dataList2} />

        <div className="p-2">
          <div className=" bg-white rounded-lg">
            <div className="flex space-x-2 items-center p-4 pb-0">
              <p className="text-[16px] text-slate-700">OTZ Clients</p>
              <Badge className="bg-slate-200 text-black shadow-none">
                {data?.length}
              </Badge>
            </div>
            <CustomTable columns={columns} data={data || []} />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default OTZ
