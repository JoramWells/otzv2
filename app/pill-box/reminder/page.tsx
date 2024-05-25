/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'
import CustomTab from '@/components/tab/CustomTab'
import { useCallback, useEffect, useState } from 'react'
import { eveningColumn } from './eveningColumn'
import { morningColumn } from './morningColumn'
import CustomSelect from '@/components/forms/CustomSelect'
import { Search, SlidersHorizontal } from 'lucide-react'
import CustomInput from '@/components/forms/CustomInput'
import { useSearchParams } from 'next/navigation'
import moment from 'moment'
import { checkTime } from '@/utils/isRightTimeForDrugs'
import { useAddPatientNotificationMutation } from '@/api/notifications/patientNotification.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

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
    link: 'dashboard'
  },
  {
    id: '3',
    label: 'Reminder',
    link: 'reminder'
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
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const { data: patientsDueMorning } = useGetAllPillDailyUptakeQuery()

  const [addPatientNotification] = useAddPatientNotificationMutation()

  // const isTime = checkTime(patientsDueMorning)?.some(time=>time)

  const morningData = useCallback(() => {
    return patientsDueMorning?.filter((item: any) => {
      return item.timeAndWork?.morningMedicineTime
    })
  }, [patientsDueMorning])

  console.log(patientsDueMorning, 'yut')

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
      {value === 'All' && (
        <div>
          <div className="mb-2 flex flex-row justify-between">
            <div className="w-1/4 flex flex-row items-center justify-center space-x-2">
              <CustomInput value="" onChange={() => {}} />
              <Search className="bg-slate-200 h-9 w-9 p-2 rounded-lg" />
            </div>
            <div className="flex flex-row justify-end w-1/4 items-center rounded-lg space-x-4 p-2">
              <div className="w-1/4">
                <CustomSelect
                  placeholder="Status"
                  data={[
                    {
                      id: 'Completed',
                      label: 'Completed'
                    },
                    {
                      id: 'Not Completed',
                      label: 'Not Completed'
                    }
                  ]}
                  value=""
                  onChange={() => {}}
                />
              </div>
              <SlidersHorizontal className="bg-slate-200 h-9 w-9 p-2 rounded-lg" />
            </div>
          </div>
          <CustomTable
            columns={columns}
            data={patientsDueMorning || []}
            isSearch={false}
          />
        </div>
      )}
      {/*  */}
      <div className='p-4'>
        {value === 'all' && (
          <div className='bg-white p-4 rounded-lg'>
            <CustomTable
              columns={morningColumn}
              data={patientsDueMorning || []}
            />
          </div>
        )}
        {/*  */}
        {value === 'morning' && (
          <CustomTable
            columns={morningColumn}
            data={patientsDueMorning || []}
          />
        )}
        {/*  */}
        {value === 'evening' && (
          <CustomTable
            columns={eveningColumn}
            data={patientsDueMorning || []}
          />
        )}
      </div>
    </div>
  )
}

export default AppointmentPage
