/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '@/app/_components/table/CustomTable'
import CustomTab from '@/components/tab/CustomTab'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BreadcrumbComponent } from '@/components/nav/BreadcrumbComponent'
import { useGetAllOTZEnrollmentsQuery } from '../../../api/enrollment/otzEnrollment.api'
import { otzColumns } from './column'
import HeaderTitle from '../_components/HeaderTitle'

const categoryList = [
  {
    id: 2,
    label: 'OTZ'
  },
  {
    id: 4,
    label: 'OVC'
  },
  {
    id: 5,
    label: 'PAMA'
  },
  {
    id: 6,
    label: 'PMTCT'
  }
]

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'enrollments',
    link: 'enrollments'
  }
]

const Page = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data, isLoading } = useGetAllOTZEnrollmentsQuery()

  console.log(data, 'try')

  useEffect(() => {
    if (tab === null) {
      setValue('otz')
    }
  }, [tab])

  return (
    <div className="flex flex-col space-y-2">
      <BreadcrumbComponent dataList={dataList2} />
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />

      {value === 'otz' && (
        <div className="p-4 w-full">
          <div className="w-full flex flex-col rounded-lg bg-white p-4">
            <HeaderTitle
              title="Enrollment"
              label='Create New OTZ'
              link={'/users/enrollment/enroll-otz'}
            />
            <CustomTable
              columns={otzColumns}
              data={data || []}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
