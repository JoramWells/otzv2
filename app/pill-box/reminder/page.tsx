/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
// import { columns } from './columns'
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// import { checkTime } from '@/utils/isRightTimeForDrugs'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { usePharmacyContext } from '@/context/PharmacyContext'
import { eveningColumn, type ExtendedAdherenceAttributes, morningColumn } from './column'
import { Badge } from '@/components/ui/badge'
import { BadgeCheck, CircleX } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import moment from 'moment'

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
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [value, setValue] = useState<string | null>(tab)
  // const [uptakeData, setUptakeData] = useState([])

  const { setAdherenceData } = usePharmacyContext()

  const { data: adherenceData } = useGetAllPillDailyUptakeQuery({
    date: moment(date).format('YYYY-MM-DD') as unknown as Date
  })
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

  const handleDeleteColumn = (id: string) => {
    const filteredData = adherenceData?.filter((row) => row.id !== id)
    setAdherenceData(filteredData)
  }

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

  console.log(moment(date).format('YYYY-MM-DD'), 'dtx')

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      {/* {currentTime.format("HH:mm:ss")} */}
      <div className="mt-2">
        <CustomTab
          categoryList={categoryList}
          value={value}
          setValue={setValue}
        />
      </div>
      {/*  */}
      <div className="p-2 flex flex-row justify-between space-x-2">
        <div className="bg-white p-4 rounded-lg flex-1">
          {/*  */}
          {value === 'morning' && (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="text-slate-700 text-[16px] font-semibold capitalize ">
                  Morning prescription
                </p>
                <div className="flex space-x-2">
                  <Badge className="bg-teal-100 text-teal-600 rounded-lg shadow-none mb-2 hover:bg-teal-200">
                    <BadgeCheck size={16} className="mr-1 " />
                    <p>
                      Success{' '}
                      {
                        morningData?.filter((item) => item.morningStatus)
                          ?.length
                      }
                    </p>
                  </Badge>

                  {/*  */}
                  <Badge className="bg-red-100 text-red-600 rounded-lg shadow-none mb-2 hover:bg-red-200">
                    <CircleX size={16} className="mr-1 " />
                    <p>
                      Fail{' '}
                      {
                        morningData?.filter(
                          (item) => item.morningStatus === false
                        )?.length
                      }
                    </p>
                  </Badge>
                </div>
              </div>
              <CustomTable
                columns={morningColumn(handleDeleteColumn)}
                data={morningData ?? []}
                isSearch={false}
              />
            </>
          )}
          {/*  */}
          {value === 'evening' && (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="text-slate-700 text-[16px] font-semibold capitalize ">
                  Evening prescription
                </p>
                <div className="flex space-x-2">
                  <Badge className="bg-teal-100 text-teal-600 rounded-lg shadow-none mb-2 hover:bg-teal-200">
                    <BadgeCheck size={16} className="mr-1 " />
                    <p>
                      Success{' '}
                      {
                        eveningData?.filter((item) => item.eveningStatus)
                          ?.length
                      }
                    </p>
                  </Badge>

                  {/*  */}
                  <Badge className="bg-red-100 text-red-600 rounded-lg shadow-none mb-2 hover:bg-red-200">
                    <CircleX size={16} className="mr-1 " />
                    <p>
                      Fail{' '}
                      {
                        eveningData?.filter(
                          (item) => item.eveningStatus === false
                        )?.length
                      }
                    </p>
                  </Badge>
                </div>
              </div>
              <CustomTable
                columns={eveningColumn(handleDeleteColumn)}
                data={eveningData ?? []}
                isSearch={false}
              />
            </>
          )}
        </div>
        <div className="bg-white  rounded-lg">
          <div
          className='p-2'
          >
            <p className="font-semibold text-slate-700 ">
              Select the dates that you want to view
            </p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            // disabled={(date) => date <= new Date()}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default AppointmentPage
