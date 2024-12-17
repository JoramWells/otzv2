/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

import { CustomTable } from '@/app/_components/table/CustomTable'
// import { type DateRange } from 'react-day-picker'
import { type ExtendedLineListInterface, useGetAllETLQuery } from '@/api/etl/etl.api'
import { linelistColumn } from './columns'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { type UserInterface } from 'otz-types'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)
const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const fetchData = async (taskID: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/etl/task-status/${taskID}/`)
  // console.log(data, 'progress')
  return data
}

const fetchStatuses = async (data: any[]) => {
  try {
    const validatedItems = data.filter((item) => item.taskID)
    const statusData = await Promise.all(
      validatedItems?.map(async (item) => {
        if (item.taskID) {
          const response = await fetchData(item.taskID)
          return { [item.taskID]: response }
        }
      })
    )

    const statuses = statusData.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    )
    return statuses
  } catch (error) {
    console.log(error)
  }
}

const ETL = () => {
  const [user, setUser] = useState<UserInterface>()
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const [etlData, setEtlData] = useState<ExtendedLineListInterface[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])

  const { data, isLoading } = useGetAllETLQuery({
    hospitalID: user?.hospitalID as string,
    page: Number(page) ?? 1,
    pageSize: 10,
    searchQuery: search
  },
  {
    skip: !user?.hospitalID
  }
  )

  type StatusType = Record<string, any>

  const [statuses, setStatuses] = useState<StatusType>({})

  useEffect(() => {
    if (data) {
      setEtlData(data.data)
      setTotal(data.total)
      //

      setStatuses(fetchStatuses(data.data))
    }
  }, [data])

  const filteredArray = etlData ? [...etlData] : []
  filteredArray.sort(
    (a, b) =>
      new Date(b.createdAt as unknown as string).getTime() -
        new Date(a.createdAt as unknown as string).getTime()
  )

  // const handleFilter = (range: DateRange | undefined) => {
  //   const dataFiltered = csvArray.filter((item) => {
  //     if (range !== undefined) {
  //       const tempData = new Date(
  //         moment(item.DOB, 'DD-MM-YY').format('DD-MM-YYYY')
  //       )
  //       return tempData >= range.from && tempData <= range?.to
  //     } else {
  //       return []
  //     }
  //   })
  //   setFilteredData(dataFiltered)
  //   setDate(range)
  // }

  // const [dragFiles, setDraggedFiles] = useState<File[]>()
  const router = useRouter()
  return (
    <>
        <BreadcrumbComponent dataList={dataList} />

      <>
        <div className="p-2">
          <div className="bg-white rounded-lg border">
            {/*  */}
            <div
            className='flex items-center justify-between mb-2 p-1 pl-2 pr-2 border-b bg-slate-50 rounded-t-lg'
            >
              <div className="flex space-x-2 items-center">
                <p className=" text-[16px] text-slate-700 ">
                  Uploaded Linelist{' '}
                </p>
                <Badge className="bg-slate-200 text-black shadow-none">
                  {total}
                </Badge>
              </div>
              <Button
                size={'sm'}
                onClick={() => {
                  router.push('/etl/add')
                }}
                // className="absolute top-2 right-2"
              >
                Add
              </Button>
            </div>

            {/*  */}
            <CustomTable
              isSearch={false}
              columns={linelistColumn(statuses)}
              isLoading={isLoading}
              data={filteredArray ?? []}
              search={search}
              setSearch={setSearch}
              total={total}
            />
          </div>
        </div>
      </>

      {/* <DragNDrop onFileSelected={setDraggedFiles} /> */}
    </>
  )
}

export default ETL
