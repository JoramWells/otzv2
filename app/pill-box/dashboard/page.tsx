/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { History, Pin } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { type ExtendedPrescriptionInterface, useGetAllPrescriptionsQuery, useGetFacilityAdherenceQuery } from '@/api/pillbox/prescription.api'
import { useGetAllArtPrescriptionQuery, useGetArtPrescriptionByCategoryQuery } from '@/api/art/artPrescription.api'
import { type UserInterface, type ARTPrescriptionInterface, type PrescriptionInterface } from 'otz-types'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
// import { CustomTable } from '@/app/_components/table/CustomTable'
// import { importantPrescription } from '../prescription/columns'
import { usePharmacyContext } from '@/context/PharmacyContext'
import AdherenceRate from '@/components/Recharts/AdherenceRate'
// import { useGetImportantPatientQuery } from '@/api/patient/importantPatients.api'
import { useSession } from 'next-auth/react'
import { DailyPillUptake } from '@/components/Recharts/DailyPillUptake'

//
const HorizontalLineChart = dynamic(
  async () => await import('@/components/Recharts/HorizontalLineChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[250px] flex-1 rounded" />
  }
)

//
const RadarARTChart = dynamic(
  async () => await import('@/components/Recharts/RadarARTChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[250px] flex-1 rounded" />
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

const NotifyPage = () => {
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { uptakeCount } = usePharmacyContext()

  const { data: facilityData } = useGetFacilityAdherenceQuery()

  // const { data: prescriptionData } = useGetAllPrescriptionsQuery({
  //   mode: undefined,
  //   hospitalID: user?.hospitalID as string
  // })

  // const filteredArray: PrescriptionInterface[] = prescriptionData
  //   ? [...prescriptionData]
  //   : []
  // filteredArray.sort(
  //   (a, b) =>
  //     new Date(b.createdAt as unknown as string).getTime() -
  //       new Date(a.createdAt as unknown as string).getTime()
  // )

  // const recentPrescription = filteredArray?.slice(0, 3)

  // const filterPrescriptionData = useCallback(() => {
  //   const tempData = prescriptionData ? [...prescriptionData] : []
  //   return tempData.filter(
  //     (item: ExtendedPrescriptionInterface) => item?.Patient?.isImportant
  //   )
  // }, [prescriptionData])()
  // const { data: importantPatients } = useGetImportantPatientQuery(
  //   session?.user.id as string
  // )
  // const importantPatientIDs = importantPatients?.map((item) => item.patientID)

  // const importantPatientAppointment = filterPrescriptionData?.filter(
  //   (appointment) => importantPatientIDs?.includes(appointment.patientID)
  // )

  const { data: artPrescriptionData, isLoading: loadingArtPrescription } =
    useGetAllArtPrescriptionQuery(
      {
        hospitalID: user?.hospitalID as string
      },
      {
        skip: !user?.hospitalID
      }
    )

  const [value, setValue] = useState(1)

  const { data: artP } = useGetArtPrescriptionByCategoryQuery({
    hospitalID: user?.hospitalID as string
  },
  {
    skip: !user?.hospitalID
  })

  const formatData = useCallback(() => {
    return artP?.map(item => ({
      line: item?.line,
      count: Number(item?.count)
    }))
  }, [artP])

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <AdherenceRate data={facilityData} />
      <div className="flex flex-row justify-between items-start w-full space-x-2 p-2 pt-0 ">
        {/* <DoubleARTUptakeBarChart
          morningTrueCount={uptakeCount.morningTrue}
          morningFalseCount={uptakeCount.morningFalse}
          eveningTrueCount={uptakeCount?.eveningTrue}
          eveningFalseCount={uptakeCount?.eveningFalse}
        /> */}
        <DailyPillUptake
        data={uptakeCount}
        />

        {/*  */}

        <HorizontalLineChart
          data={formatData() ?? []}
          isLoading={loadingArtPrescription}
          dataKey={'count'}
          label={'line'}
          title='Regimen line count'
        />

        {/*  */}
        <RadarARTChart
          data={artPrescriptionData as ARTPrescriptionInterface[]}
          title='Active ART'
        />
      </div>

      {/*  */}
      <div className="p-2 pt-0 ">
        <div className=" rounded-lg flex flex-row space-x-2 mb-2 p-2 bg-white">
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
              size={'sm'}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
        <div className="p-2 bg-white pt-0">
          {/* {value === 1 && (
            <CustomTable
              isSearch={false}
              data={importantPatientAppointment || []}
              columns={importantPrescription}
            />
          )} */}

          {/*  */}
          {/* {value === 2 && (
            <CustomTable
              isSearch={false}
              data={recentPrescription || []}
              columns={importantPrescription}
            />
          )} */}
        </div>
      </div>
    </>
  )
}

export default NotifyPage
