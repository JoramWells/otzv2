/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetHomeVisitQuery } from '@/api/homevisit/homeVisit.api'
import { Skeleton } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

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
    label: 'Patients',
    link: '/'
  }
]

const HomeVisit = ({ params }: { params: any }) => {
  const { homeVisitID }: { homeVisitID: string } = params
  const [homeVisitData, setHomeVisitData] = useState({
    returnToClinic: ''
  })
  const { data } = useGetHomeVisitQuery(homeVisitID)
  useEffect(() => {
    if (data != null) {
      const { returnToClinic } = data
      setHomeVisitData({
        returnToClinic
      })
    }
  }, [data])
  console.log(data)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div
      className='flex space-x-2'
      >
        <div>
          <p>Prescription Details</p>
        </div>

        <div>
          <p>Follow Up details</p>
        </div>
      </div>
    </div>
  )
}

export default HomeVisit
