/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetVlReasonsQuery } from '@/api/enrollment/viralLoadTests.api'
import { useUserContext } from '@/context/UserContext'
import { AppointmentBarChart } from '@/components/Recharts/AppointmentBarChart'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
import { useState } from 'react'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

// const VLBarChart = dynamic(
//   async () => await import('../../_components/charts/VLBarChart'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
//   }
// )

const VLPieChart = dynamic(
  async () => await import('../../_components/charts/VLPieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
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
    link: ''
  }
]

const NotifyPage = () => {
  const [dateQuery, setDateQuery] = useState('')
  // console.log(viralLoadData, 'viralLoadData')
  // const { data: session } = useSession()
  // useEffect(() => {
  //   if (session) {
  //     setUser(session.user)
  //   }
  // }, [session])
  // const { data: vlSuppression } = useGetVLSuppressionRateQuery({
  //   hospitalID: user?.hospitalID,
  //   startDate: new Date('2023-04-05'),
  //   endDate: new Date('2024-11-09')
  // },
  // {
  //   skip: !user?.hospitalID
  // })

  const { authUser } = useUserContext()

  const { data: vlReasonsData } = useGetVlReasonsQuery({
    hospitalID: authUser?.hospitalID as string,
    dateQuery
  },
  {
    skip: (authUser?.hospitalID) == null
  }
  )

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className=" p-2">
        <div className="flex flex-row
        bg-white rounded-lg mb-1 p-2
         justify-between items-center">
          <h3
            className="font-semibold
        capitalize
        "
          >
            Analytics Appointments
          </h3>
          <div className='w-1/4'>
            <CustomSelectParams
              paramValue="dateQuery"
              value={dateQuery}
              onChange={setDateQuery}
              data={[
                {
                  id: 'All',
                  label: 'All'
                },
                {
                  id: '7D',
                  label: '7D'
                },
                {
                  id: '14D',
                  label: '14D'
                },
                {
                  id: '21D',
                  label: '21D'
                },
                {
                  id: '1 month',
                  label: '1 month'
                }
              ]}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <AppointmentBarChart
            data={vlReasonsData ?? []}
            dataKey="dateOfVl"
            label="vlJustification"
          />

          <VLPieChart />
        </div>
      </div>
    </div>
  )
}

export default NotifyPage
