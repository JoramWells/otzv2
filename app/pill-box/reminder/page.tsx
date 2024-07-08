/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
// import { columns } from './columns'
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { eveningColumn } from './eveningColumn'
import { morningColumn } from './morningColumn'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import moment from 'moment'
// import { checkTime } from '@/utils/isRightTimeForDrugs'
import { useAddPatientNotificationMutation } from '@/api/notifications/patientNotification.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import io from 'socket.io-client'
import { useSession } from 'next-auth/react'

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

const dataList = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Morning'
  },
  {
    id: 3,
    label: 'Evening'
  }
]

const AppointmentPage = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data: patientsDueMorning } = useGetAllPillDailyUptakeQuery()
  const [uptakeData, setUptakeData] = useState([])

  const [addPatientNotification] = useAddPatientNotificationMutation()

  // const isTime = checkTime(patientsDueMorning)?.some(time=>time)

  const morningData = useCallback(() => {
    return patientsDueMorning?.filter((item: any) => {
      return item.timeAndWork?.morningMedicineTime
    })
  }, [patientsDueMorning])

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

  const updateMorningStatus = (arr: string[], id: string) => {
    if (arr.length > 0) {
      return arr?.map((obj) => {
        if (obj.id === id) {
          return { ...obj, morningStatus: true }
        }
        return obj
      })
    }
    return null
  }

  useEffect(() => {
    const newSocket = io('http://localhost:5003')
    if (session != null) {
      newSocket.emit('getPharmacyNotifications', session.user)
      newSocket.on('newPharmacyNotifications', (data) => {
        if (patientsDueMorning) {
          setUptakeData(patientsDueMorning)
          const updatedData = updateMorningStatus(patientsDueMorning, data.id)
          setUptakeData(updatedData)
          console.log(updatedData, 'uio')
        }
      })
    }
  }, [session, patientsDueMorning])

  useEffect(() => {
    if (tab === null) {
      updateQueryParams('all')
    }
  }, [tab, updateQueryParams])

  const [currentTime, setCurrentTime] = useState(moment())
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
      <CustomTab categoryList={dataList} value={value} setValue={setValue} />

      {/*  */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg">
          {value === 'all' && (
            <CustomTable
              columns={morningColumn}
              data={uptakeData || []}
            />
          )}
          {/*  */}
          {value === 'morning' && (
            <CustomTable
              columns={morningColumn}
              data={uptakeData || []}
            />
          )}
          {/*  */}
          {value === 'evening' && (
            <CustomTable
              columns={eveningColumn}
              data={uptakeData || []}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentPage
