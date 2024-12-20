/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
// import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { configColumns } from './columns'
import { useGetAllHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import PageTableContainer from '../_components/table/PageTableContainer'
import { useUserContext } from '@/context/UserContext'
import usePreprocessData from '@/hooks/usePreprocessData'
import { useState } from 'react'
import useSearch from '@/hooks/useSearch'

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
    label: 'Dashboard',
    link: '/home-visit/dashboard'
  },
  {
    id: '3',
    label: 'Home visit',
    link: ''
  }
]

const HomeVisitPage = () => {
  const [search, setSearch] = useState('')
  const { hospitalID } = useUserContext()
  const { data: configData, isLoading } = useGetAllHomeVisitConfigQuery({
    hospitalID: hospitalID as string,
    page: 1,
    pageSize: 10,
    searchQuery: search
  })
  useSearch({ search, setSearch })

  const router = useRouter()

  const { data, total } = usePreprocessData(configData)
  console.log(configData)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <PageTableContainer
        rightLabel={
          <Button
            className="shadow-none m-0 bg-teal-600 hover:bg-teal-500 "
            // variant={'outline'}
            size={'sm'}
            onClick={() => {
              router.push('/home-visit/add')
            }}
          >
            New
          </Button>
        }
        title="Home Visit"
        columns={configColumns}
        data={data ?? []}
        isLoading={isLoading}
        total={total as number}
        search={search}
        setSearch={setSearch}
      />
    </>
  )
}

export default HomeVisitPage
