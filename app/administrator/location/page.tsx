/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, subCountyColumns, wardColumns } from './columns'
import { useState } from 'react'
import { useGetAllCountiesQuery } from '@/api/location/county.api'
import { useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import CustomTab from '@/components/tab/CustomTab'
import { useGetAllWardsQuery } from '@/api/location/ward.api'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'Home',
    link: '/'
  },
  {
    id: '2',
    label: 'Home Visit',
    link: 'home-visit'
  }
]

const categoryList = [
  {
    id: 1,
    label: 'County'
  },
  {
    id: 2,
    label: 'Sub County'
  },
  {
    id: 3,
    label: 'Ward'
  }
]

const Occupations = () => {
  const [value, setValue] = useState('county')

  const { data } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: wardData } = useGetAllWardsQuery()

  console.log(wardData, 'ward')

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />

      <div
        className="gap-x-4 bg-white p-2 rounded-lg mt-2
           flex flex-row
          "
      >
        <CustomTab
          categoryList={categoryList}
          value={value}
          setValue={setValue}
        />
      </div>

      <div className="w-full p-2">
        {value === 'county' && (
          <CustomTable columns={columns} data={data ?? []} isSearch={false} />
        )}

        {value === 'sub county' && (
          <CustomTable
            columns={subCountyColumns}
            data={subCountyData ?? []}
            isSearch={false}
          />
        )}

        {/*  */}
        {value === 'ward' && (
          <CustomTable
            columns={wardColumns}
            data={wardData ?? []}
            isSearch={false}
          />
        )}
      </div>
    </>
  )
}

export default Occupations
