/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { History, Pin, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPillDailyUptakeCountQuery } from '@/api/treatmentplan/uptake.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useGetAllPrescriptionsQuery, useGetFacilityAdherenceQuery } from '@/api/pillbox/prescription.api'
import ARTLineChart from '@/components/Recharts/ARTLineChart'
import { useGetAllArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import HorizontalLineChart from '@/components/Recharts/HorizontalLineChart'
import { type ARTPrescriptionInterface, type PrescriptionInterface } from 'otz-types'
import RadarARTChart from '@/components/Recharts/RadarARTChart'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { importantPatientColumn } from '@/app/users/patients/_components/columns'
import { importantPrescription } from '../prescription/columns'

const DoubleARTUptakeBarChart = dynamic(
  async () => await import('../../_components/charts/DoubleARTUptakeBarChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[350px] md:w-[500px] rounded" />
  }
)

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
    label: 'dashboard',
    link: '/dashboard'
  }
]

interface DataPops {
  id: number
  year: number
  userGain: number
  userLost: number
}

const NotifyPage = () => {
  const router = useRouter()

  const { data } = useGetAllTimeAndWorkQuery(
    {
      medicationsDue: true
    }
  )

  const { data: uptakeCount } = useGetPillDailyUptakeCountQuery({
    patientsDueMorning: true
  })

  const { data: facilityData } = useGetFacilityAdherenceQuery()

  const { data: prescriptionData } = useGetAllPrescriptionsQuery()

 type ModifiedPrescriptionInterface = PrescriptionInterface & {
   Patient?: {
     firstName: string
     secondName: string
     isImportant: boolean
   }
 }
 console.log(prescriptionData, 'prescriptionData')

 const filteredArray: PrescriptionInterface[] = prescriptionData
   ? [...prescriptionData]
   : []
 filteredArray.sort(
   (a, b) =>
     new Date(b.createdAt as unknown as string).getTime() -
        new Date(a.createdAt as unknown as string).getTime()
 )

 const recentPrescription = filteredArray?.slice(0, 3)

 const filterPrescriptionData = useCallback(() => {
   const tempData = prescriptionData ? [...prescriptionData] : []
   return tempData.filter((item: ModifiedPrescriptionInterface) => item?.Patient?.isImportant)
 }, [prescriptionData])()

 console.log(recentPrescription, 'pdatax')

 const { data: artPrescriptionData, isLoading: loadingArtPrescription } = useGetAllArtPrescriptionQuery()

 const dataList = [
   {
     id: '1',
     label: 'On ART',
     count: 50,
     link: ''
   },
   {
     id: '2',
     label: 'On TB',
     count: 20,
     link: ''
   },
   {
     id: '3',
     label: 'On Anti-TB',
     count: 13,
     link: ''
   },
   {
     id: '4',
     label: 'Adherence',
     count: facilityData || 0,
     link: ''
   }
 ]

 const [value, setValue] = useState(1)

 return (
    <div className="w-full  bg-slate-50">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-4 p-2 md:grid-cols-2">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg p-5 bg-white
             h-[130px] flex flex-col hover:cursor-pointer hover:shadow-sm
      "
            // onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h3 className="font-bold">{item.label}</h3>
              <Users size={15} />
            </div>
            <p className="text-xl font-bold">
              {item.label === 'Adherence' ? `${item.count} %` : item.count}
            </p>
            <p className="text-slate-500 text-[12px]">Since last month</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4">
        <div className="flex flex-row items-start w-full space-x-4">
          <DoubleARTUptakeBarChart
            morningTrueCount={uptakeCount?.morningTrueCount}
            morningFalseCount={uptakeCount?.morningFalseCount}
            eveningTrueCount={uptakeCount?.eveningTrueCount}
            eveningFalseCount={uptakeCount?.eveningFalseCount}
          />

          {/*  */}

          <HorizontalLineChart
            data={artPrescriptionData as ARTPrescriptionInterface[]}
            isLoading={loadingArtPrescription}
          />

          {/*  */}
          <RadarARTChart
            data={artPrescriptionData as ARTPrescriptionInterface[]}
          />
        </div>
      </div>

      {/*  */}
      <div className="p-2 bg-white mt-2">
        <div className="flex flex-row space-x-2 mb-2">
          {[
            {
              id: 1,
              label: 'Pinned',
              icon: <Pin size={18} className="mr-2" />
            },
            {
              id: 2,
              label: 'Recent',
              icon: <History size={18} className="mr-2" />
            }
          ].map((item) => (
            <Button
              key={item.id}
              onClick={() => setValue(item.id)}
              className={`text-slate-700 hover:bg-slate-50 bg-transparent hover:text-teal-600 rounded-none
                      ${
                        value === item.id &&
                        'border-b-2 border-teal-600 text-teal-600'
                      }
                      `}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
        <div
        className='p-2'
        >
          {value === 1 && (
            <CustomTable
              isSearch={false}
              data={filterPrescriptionData || []}
              columns={importantPrescription}
            />
          )}

          {/*  */}
          {value === 2 && (
            <CustomTable
              isSearch={false}
              data={recentPrescription || []}
              columns={importantPrescription}
            />
          )}
        </div>
      </div>
    </div>
 )
}

export default NotifyPage
