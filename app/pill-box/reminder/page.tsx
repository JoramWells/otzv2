/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
// import { columns } from './columns'
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { eveningColumn } from './eveningColumn'
import { type ExtendedAdherenceAttributes, morningColumn } from './morningColumn'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// import { checkTime } from '@/utils/isRightTimeForDrugs'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { usePharmacyContext } from '@/context/PharmacyContext'

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
  },
  {
    id: '3',
    label: 'Reminder',
    link: '/reminder'
  }
]

const AppointmentPage = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  // const [uptakeData, setUptakeData] = useState([])

  const { adherenceData } = usePharmacyContext()

  // const isTime = checkTime(patientsDueMorning)?.some(time=>time)

  const morningData = useCallback(() => {
    return adherenceData?.filter((item: ExtendedAdherenceAttributes) => {
      return item.TimeAndWork?.morningMedicineTime !== null
    })
  }, [adherenceData])()

  const eveningData = useCallback(() => {
    return adherenceData?.filter((item: ExtendedAdherenceAttributes) => {
      return item.TimeAndWork?.eveningMedicineTime !== null
    })
  }, [adherenceData])()

  const categoryList = useMemo(() => [
    {
      id: 1,
      label: 'Morning',
      count: morningData?.length
    },
    {
      id: 2,
      label: 'Evening',
      count: eveningData?.length
    }
  ], [eveningData?.length, morningData?.length])

  const pathname = usePathname()
  const router = useRouter()

  const updateQueryParams = useCallback(
    (newStep: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('tab', newStep)
      router.replace(`${pathname}?${newSearchParams.toString()}`)
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    if (tab === null) {
      updateQueryParams('morning')
      setValue('morning')
    }
  }, [tab, updateQueryParams])

  // const [currentTime, setCurrentTime] = useState(moment())
  // useEffect(() => {
  //   patientsDueMorning?.forEach((item: any) => {
  //     // const patientID = item
  //     const time = moment(
  //       item.timeAndWork?.eveningMedicineTime,
  //       "HH:mm:ss"
  //     )
  //     const currentTime = moment();
  //     const timeDifference = time.diff(currentTime);
  //     if (timeDifference > 0) {
  //       const notificationTimeOut = setTimeout(() => {
  //         addPatientNotification({
  //           patientID: item.timeAndWork.patient.id,
  //           message: "Remember",
  //         });
  //         console.log("mess");
  //       }, timeDifference);
  //       return () => clearTimeout(notificationTimeOut);
  //     }
  //   });

  //   // const intervalID = setInterval(()=>{
  //   //   setCurrentTime(moment())
  //   // },1000)

  //   // return ()=>clearInterval(intervalID)
  // }, [patientsDueMorning]);

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      {/* {currentTime.format("HH:mm:ss")} */}
      <CustomTab categoryList={categoryList} value={value} setValue={setValue} />

      {/*  */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg">
          {/*  */}
          {value === 'morning' && (
            <CustomTable columns={morningColumn} data={morningData ?? []}
            isSearch={false}

            />
          )}
          {/*  */}
          {value === 'evening' && (
            <CustomTable columns={eveningColumn} data={eveningData ?? []}
            isSearch={false}

            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage
