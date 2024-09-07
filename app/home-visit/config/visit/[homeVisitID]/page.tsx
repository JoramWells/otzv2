/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { useGetAllHomeVisitByIDQuery } from '@/api/homevisit/homeVisit.api'
import { useGetHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import CurrentConfig from '@/app/home-visit/_components/CurrentConfig'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'
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
const Page = ({ params }: { params: any }) => {
  const searchParams = useSearchParams()
  const patientID = searchParams.get('patientID')

  const { homeVisitID } = params
  const { data } = useGetHomeVisitConfigQuery(homeVisitID as string)
  const { data: homeVisitData } = useGetAllHomeVisitByIDQuery(homeVisitID as string)
  console.log(homeVisitData)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2 flex flex-row space-x-4">
        {/*  */}
        <CurrentConfig
          dateRequested={data?.dateRequested}
          frequency={data?.frequency}
          homeVisitReasonDescription={
            data?.HomeVisitReason.homeVisitReasonDescription
          }
          id={data?.id}
          patientID={patientID!}
          isConfig
        />
        <div>Recent Home Visits</div>
      </div>
    </div>
  )
}

export default Page
