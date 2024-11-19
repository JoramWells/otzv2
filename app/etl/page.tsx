/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

import { CustomTable } from '@/app/_components/table/CustomTable'
// import { type DateRange } from 'react-day-picker'
import { useGetAllETLQuery } from '@/api/etl/etl.api'
import { linelistColumn } from './columns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { type UserInterface } from 'otz-types'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
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

const ETL = () => {
  const [user, setUser] = useState<UserInterface>()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data, isLoading } = useGetAllETLQuery({
    hospitalID: user?.hospitalID as string
  })

  const filteredArray = data ? [...data] : []
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
    <div>
      <div className="flex justify-between w-full items-center bg-white relative">
        <BreadcrumbComponent dataList={dataList} />

        <Button
          size={'sm'}
          onClick={() => {
            router.push('/etl/add')
          }}
          className="absolute top-2 right-2"
        >
          Add
        </Button>
      </div>

      <>
        <div className="p-2">
          <div className="bg-white rounded-lg">
            <div
            className='flex space-x-2 items-center p-4 pb-0'
            >
              <p className=" text-[16px] text-slate-700 ">Uploaded Linelist </p>
              <Badge
              className='bg-slate-200 text-black shadow-none'
              >{data?.length}</Badge>
            </div>
            <CustomTable
              columns={linelistColumn}
              isLoading={isLoading}
              data={filteredArray ?? []}
            />
          </div>
        </div>
      </>

      {/* <DragNDrop onFileSelected={setDraggedFiles} /> */}
    </div>
  )
}

export default ETL
