/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import CustomTab from '../../../components/tab/CustomTab'
import { useGetAllViralLoadTestsQuery } from '@/api/enrollment/viralLoadTests.api'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

// interface ItemsProps {
//   dob: MomentInput
// }

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/'
  }
]

const TrackPage = () => {
  // const datax = await getPatients()
  const { data } = useGetAllPatientsQuery()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data: vlData } = useGetAllViralLoadTestsQuery()

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'All',
        description: 'All patients',
        count: data?.length
      },
      {
        id: 2,
        label: 'Early Years',
        description: '0 yrs to 9 yrs'
      },
      {
        id: 3,
        label: 'Middle School',
        description: '10 yrs to 19 yrs'
      },
      {
        id: 4,
        label: 'Senior',
        description: 'Tertiary'
      },
      {
        id: 5,
        label: 'Tertiary ',
        description: 'Tertiary'
      }
    ],
    [data?.length]
  )

  const sortedAppointment: ViralLoadInterface[] = useMemo(
    () => (vlData ? [...vlData] : []),
    [vlData]
  )

  // const memSorted = useCallback(() => {}, [])

  sortedAppointment.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className='mt-2 mb-2 ' >
        <CustomTab
          categoryList={categoryList}
          setValue={setValue}
          value={value}
        />
      </div>
      <div className="p-2 bg-white">
        <CustomTable columns={columns} data={sortedAppointment || []} />
      </div>
    </>
  )
}

export default TrackPage
