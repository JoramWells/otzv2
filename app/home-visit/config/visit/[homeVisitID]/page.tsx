'use client'
import { useGetHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const router = useRouter()
  console.log(data)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="w-1/2 bg-white rounded-lg">
          <div className="bg-slate-200 p-2 rounded-t-lg ">
            <h3>Config</h3>
          </div>

          {/*  */}
          <div className="p-2">
            <div className="flex justify-between p-2">
              <h3>Reason</h3>
              {data?.HomeVisitReason?.homeVisitReasonDescription}
            </div>

            {/*  */}
            <hr />

            <div className="flex justify-between p-2">
              <h3>Frequency</h3>
              <p>{data?.frequency}</p>
            </div>
            <hr />

            <div className="flex justify-between p-2">
              <h3>Date Requested</h3>
              <h4>{moment(data?.dateRequested).format('ll')}</h4>
            </div>
          </div>

          {/*  */}
          <Button
            className="space-x-4 justify-between flex text-blue-500 border-none"
            variant={'outline'}
            onClick={() => { router.push(`/home-visit/add-home-visit/${data?.id}?patientID=${patientID}`) }}
          >
            Use This Config
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
