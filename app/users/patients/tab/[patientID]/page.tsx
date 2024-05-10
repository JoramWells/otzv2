/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
    label: 'dashboard',
    link: 'dashboard'
  }
]
export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const router = useRouter()
  const { patientID } = params
  const { data } = useGetViralLoadTestQuery(patientID)
  return (
    <div className="p-4">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 w-full justify-end flex">
        <Button
        onClick={() => { router.push(`/users/patients/tab/steps/${patientID}`) }}
        className="shadow-none bg-teal-600 hover:bg-teal-700 font-bold">
          Start Visit
        </Button>
      </div>

      <div className="flex space-x-2 flex-row w-full mt-4 items-start">
        <div className="rounded-lg p-4 w-1/4 bg-white">
          {data && (
            <div className="flex flex-col space-y-2">
              <div className="w-full flex justify-between items-center">
                <p className="font-bold text-lg">Current Viral Load</p>
                {data.isVLValid
                  ? (
                  <Badge className="rounded-full shadow-none hover:bg-emerald-50  bg-emerald-50 text-emerald-500">
                    Valid
                  </Badge>
                    )
                  : (
                  <Badge className="rounded-full shadow-none hover:bg-red-50  bg-red-50 text-red-500">
                    Invalid
                  </Badge>
                    )}
              </div>
              <div className="text-slate-500 flex w-full justify-between items-center">
                <p>Results:</p> {data.vlResults} Copies/ml
              </div>
              <div className="flex justify-between w-full items-center">
                <p>Date</p>
                {moment(data.dateOfVL).format('ll')}
              </div>
              <div className="flex w-full justify-between items-center">
                <p>Justification</p>
                {data.vlJustification}
              </div>
              <div className="flex items-center justify-center w-full">
                <Button
                  className="rounded-full shadow-none border-teal-600 border-2 text-teal-600
              hover:text-teal-500
              "
                  variant={'outline'}
                >
                  Update Viral Load
                </Button>
              </div>
            </div>
          )}
        </div>
        {/*  */}
        <div className="w-1/4 bg-white rounded-lg ">
          <p className="text-lg font-bold p-4">Current Vital Sighs</p>
        </div>
      </div>
    </div>
  )
}

export default PatientDetails
