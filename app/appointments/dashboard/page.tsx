/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { History, Pin } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
// import { pinnedColumns } from '../columns'
import { useSession } from 'next-auth/react'
import { type UserInterface } from 'otz-types'
import { useGetAppointmentAgendaCountQuery, useGetRecentAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { AppointmentBarChart } from '@/components/Recharts/AppointmentBarChart'
import CustomPieChart from '@/app/_components/charts/CustomPieChart'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { pinnedColumns } from '../columns'
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
    label: 'Dashboard',
    link: '/'
  }
]

const AppointmentDashboardPage = () => {
  const [value, setValue] = useState('all')
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data: weeklyData } = useGetAppointmentAgendaCountQuery({
    hospitalID: user?.hospitalID as string,
    date: value
  },
  {
    skip: !user?.hospitalID
  }
  )

  const statusCount = (appointments: Array<{ status: string }>): Array<{ status: string, count: number }> => {
  // Count each status dynamically
    const counts: Record<string, number> = appointments?.reduce<Record<string, number>>((acc, appointment) => {
      const status = appointment.status || 'Unknown' // Handle missing status
      if (!acc[status]) {
        acc[status] = 0
      }
      acc[status]++
      return acc
    }, {})

    // Transform the result into an array of objects
    return counts
      ? Object?.entries(counts).map(([status, count]) => ({
        status,
        count
      }))
      : []
  }

  const { data: priorityAppointmentData } = useGetRecentAppointmentsQuery({
    hospitalID: user?.hospitalID as string
  },
  {
    skip: !user?.hospitalID
  }

  )

  const handleSelectChange = (val: string) => {
    setValue(val)
  }

  const [tab, setTab] = useState(1)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

          <div className="flex justify-between items-center w-full bg-white p-2 mt-2 ">
              <h3
                className="font-semibold capitalize ml-2
        "
              >
                Appointments
              </h3>

            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'weekly', label: 'This week' },
                { id: 'monthly', label: 'This month' }
              ].map((item, idx) => (
                <Button
                  key={item.id}
                  size={'sm'}
                  className={`rounded-full border bg-transparent text-black hover:bg-slate-100 ${
                    item.id === value && 'bg-slate-200'
                  } `}
                  onClick={() => handleSelectChange(item.id.toLowerCase())}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2 bg-slate-50 p-2">
            <AppointmentBarChart data={weeklyData ?? []} />
            <CustomPieChart
            data={statusCount(weeklyData) ?? []}
            />
            {/* <AppointmentPieChart data={weeklyData ?? []} /> */}

          </div>
        <div className="bg-white p-4">
          <div className="flex flex-row space-x-2 mb-2 border-b border-slate-200">
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
              size={'sm'}
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`text-slate-700 hover:bg-slate-50 bg-transparent hover:text-teal-600 rounded-none
                      ${
                        tab === item.id &&
                        'border-b-2 border-teal-600 text-teal-600'
                      }
                      `}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
          {/* <div className="p-2"> */}
            {tab === 1 && (
              <CustomTable
                isSearch={false}
                data={priorityAppointmentData ?? []}
                columns={pinnedColumns}
              />
            )}

            {/*  */}
            {/* {tab === 2 && (
              <CustomTable
                isSearch={false}
                data={priorityAppointmentData || []}
                columns={pinnedColumns}
              />
            )} */}
          {/* </div> */}
        </div>

    </>
  )
}

export default AppointmentDashboardPage
