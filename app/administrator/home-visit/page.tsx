/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns, reasonColumns, type UserProps } from './columns'
import { usePathname, useRouter } from 'next/navigation'
import { useGetAllHomeVisitFrequenciesQuery } from '@/api/homevisit/homeVisitFrequency.api'
import { useState } from 'react'
import { useGetHomeVisitReasonsQuery } from '@/api/homevisit/homeVisitReason.api'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import AddHomeVisitFrequency from './add-home-visit-frequency/AddHomeVisitFrequency'
import AddHomeVisitReason from './add-home-visit-reason/AddHomeVisitReason'

//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none m-0" />
  }
)

const categoryList = [
  {
    id: 1,
    text: 'Frequency'
  },
  {
    id: 2,
    text: 'Reasons'
  }
]

const HomeVisitPage = () => {
  const [value, setValue] = useState(1)
  const { data } = useGetAllHomeVisitFrequenciesQuery()
  const { data: reasonsData } = useGetHomeVisitReasonsQuery()
  console.log(reasonsData, 'dtc')

  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    if (value === 1) {
      router.push(`${pathname}/add-home-visit-frequency`)
    } else {
      router.push(`${pathname}/add-home-visit-reason`)
    }
  }

  const dataList = [
    {
      id: '1',
      label: 'Home',
      link: ''
    },
    {
      id: '2',
      label: 'Home Visit',
      link: 'home-visit'
    }
  ]

  return (
    <>
      <BreadcrumbComponent dataList={dataList} />
      <div
        className="gap-x-4 p-2 rounded-lg
           flex flex-row mb-2 mt-2 bg-white
          "
      >
        {categoryList.map((item) => (
          <Button
            key={item.id}
            className={`rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 shadow-none
              ${value === item.id && 'bg-teal-50 text-teal-600'} `}
            // rounded={'full'}
            // size={'sm'}
            // bgColor={`${value === item.id && 'gray.700'}`}
            // color={`${value === item.id && 'white'}`}
            // shadow={`${value === item.id && 'md'}`}
            // _hover={{
            //   bgColor: `${value === item.id && 'black'}`,
            //   color: `${value === item.id && 'white'}`
            // }}
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.text}
          </Button>
        ))}
      </div>
        <div className="flex w-full p-2 flex-row justify-between space-x-2">

      {value === 1 && (
        <>
          <div className="w-3/4 bg-white p-2 rounded-lg">
            <CustomTable columns={columns} data={data ?? []} isSearch={false} />
          </div>
          <AddHomeVisitFrequency />
        </>
      )}

      {/* frequency */}
      {value === 2 && (
        <>
          <div className='w-3/4 bg-white p-2 rounded-lg'>
            <CustomTable
              columns={reasonColumns}
              data={reasonsData ?? []}
              isSearch={false}
            />
          </div>
          <AddHomeVisitReason />
        </>
      )}
      </div>
    </>
  )
}

export default HomeVisitPage
