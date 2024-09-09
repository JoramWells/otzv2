/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { useGetAllHomeVisitByIDQuery } from '@/api/homevisit/homeVisit.api'
import { useGetHomeVisitConfigQuery } from '@/api/homevisit/homeVisitConfig.api'
import CurrentConfig from '@/app/home-visit/_components/CurrentConfig'
import { Badge } from '@/components/ui/badge'
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

  const router = useRouter()

  const { data } = useGetHomeVisitConfigQuery(homeVisitID as string)
  const { data: homeVisitData } = useGetAllHomeVisitByIDQuery(homeVisitID as string)
  console.log(homeVisitData)
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2 flex flex-row space-x-4 items-start ">
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
        <div className="w-1/2  rounded-lg bg-white ">
          <div
          className='p-3 font-semibold '
          >Recent Home Visits</div>
          <hr />
          <div className="flex flex-col space-y-4 p-4 ">
            {homeVisitData?.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg border-slate-200 bg-slate-50 p-4
                flex justify-between items-center
                "
              >
                <div>
                  <div className="flex flex-row space-x-2 items-center">
                    <p>{item?.artPrescription?.currentRegimen}</p>
                    <Badge className="rounded-lg bg-white shadow-none text-slate-500 border border-slate-200 hover:bg-transparent ">
                      {item.medicineStatus}
                    </Badge>
                  </div>
                  <h3>{item.noOfPills} </h3>
                  <div className="flex flex-row space-x-2 text-slate-500 text-[14px] ">
                    <h3>Return to Clinic:</h3>
                    <h3>{moment(item.returnToClinic).calendar()} </h3>
                  </div>
                </div>

                {/*  */}
                <div className=" p-2 rounded-full hover:cursor-pointer hover:bg-slate-100 "
                onClick={() => { router.push(`/home-visit/${item.id}?patientID=${patientID}`) }}
                >
                  <ArrowRight className="text-slate-500 hover:text-slate-700 " />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
