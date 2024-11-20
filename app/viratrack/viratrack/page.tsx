/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import CustomTab from '../../../components/tab/CustomTab'
import { type ExtendedViralLoadInterface } from '@/api/enrollment/viralLoadTests.api'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { useLabContext } from '@/context/ViralLoadContext'

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
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { viralLoadData, isLoading } = useLabContext()

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'All',
        description: 'All patients',
        count: viralLoadData?.length
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
    [viralLoadData?.length]
  )

  const sortedAppointment: ExtendedViralLoadInterface[] = useMemo(
    () => (viralLoadData ? [...viralLoadData] : []),
    [viralLoadData]
  )

  // const memSorted = useCallback(() => {}, [])

  sortedAppointment.sort(
    (a, b) =>
      new Date(b.updatedAt as unknown as string).getTime() - new Date(a.updatedAt as unknown as string).getTime()
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
        <CustomTable columns={columns}
        isLoading={isLoading}
        data={sortedAppointment || []} />
      </div>
    </>
  )
}

export default TrackPage
