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
  const { data } = useGetAllETLQuery({
    hospitalID: user?.hospitalID as string
  })

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
      <div className="flex justify-between w-full items-center bg-white">
        <BreadcrumbComponent dataList={dataList} />
        <Button
        size={'sm'}
        onClick={() => { router.push('/etl/add') }}
        >
          Add
        </Button>
      </div>

      {data?.length > 0 && (
        <>
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <CustomTable columns={linelistColumn} data={data || []} />
            </div>
          </div>
        </>
      )}

      {/* <DragNDrop onFileSelected={setDraggedFiles} /> */}
    </div>
  )
}

export default ETL
