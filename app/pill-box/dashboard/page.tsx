/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetAllTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPillDailyUptakeCountQuery } from '@/api/treatmentplan/uptake.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

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
const dataList = [
  {
    id: '1',
    label: 'On ART',
    count: 50,
    link: '/notify/appointment'
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
    label: 'On Prep/Pep',
    count: 7,
    link: ''
  }
]

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

  return (
    <div className="w-full  bg-slate-50">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 p-4 md:grid-cols-2">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg p-5 bg-white
             h-[130px] flex flex-col hover:cursor-pointer hover:shadow-sm
      "
            // onClick={() => router.push('/notify/appointment')}
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="">{item.label}</h1>
              <Users size={15} />
            </div>
            <p className="text-xl font-bold">{item.count}</p>
            <p className="text-slate-500 text-[12px]">Since last month</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4">
        <div className='w-full mb-2' >
          <h1
            className="font-semibold text-lg
        "
          >
            Patient Pillbox
          </h1>

          <p className="text-[14px] text-slate-500 ">
            Manage patient appointments
          </p>
        </div>
        <DoubleARTUptakeBarChart
          morningTrueCount={uptakeCount?.morningTrueCount}
          morningFalseCount={uptakeCount?.morningFalseCount}
          eveningTrueCount={uptakeCount?.eveningTrueCount}
          eveningFalseCount={uptakeCount?.eveningFalseCount}
        />
      </div>

      {/* <div
        className="flex flex-row w-full justify-between
      space-x-4
      "
      >
        {['high vl', 'lu'].map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-100 rounded-lg p-4
        border-l-8 border-l-teal-600 flex-1
        "
          >
            <h1
              className="capitalize text-lg
          font-semibold
          "
            >
              Support group
            </h1>
            <h1
              className="capitalize
            text-slate-500
          "
            >
              Book Appointments for patient with high vl
            </h1>
            <p className="mt-2 text-xl font-extrabold">35,567 Patients</p>

            <div className="w-full flex justify-end">
              <Button
                className="bg-teal-600
            shadow-none
            "
              >
                Create Appointment
              </Button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default NotifyPage
