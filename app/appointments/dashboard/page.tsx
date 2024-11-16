/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import { History, Pin } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import AppointmentPieChart from '@/app/_components/charts/AppointmentPieChart'
import { useGetAllAppointmentsQuery, useGetAllPriorityAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { AppointmentBarChart } from '@/components/Recharts/AppointmentBarChart'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { pinnedColumns } from '../columns'
import { useGetImportantPatientQuery } from '@/api/patient/importantPatients.api'
import { useSession } from 'next-auth/react'
import { type UserInterface } from 'otz-types'
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

const NotifyPage = () => {
  const [value, setValue] = useState('all')
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: '2022-01-01',
    mode: value,
    hospitalID: user?.hospitalID as string
  })

  const { data: priorityAppointmentData } = useGetAllPriorityAppointmentsQuery()
  const { data: importantPatients } = useGetImportantPatientQuery(
    session?.user.id as string
  )

  const importantPatientIDs = importantPatients?.map(item => item.patientID)

  const importantPatientAppointment = weeklyData?.filter(appointment =>
    importantPatientIDs?.includes(appointment.patientID)
  )

  const handleSelectChange = (val: string) => {
    setValue(val)
  }

  const [tab, setTab] = useState(1)

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

          <div className="flex justify-between items-center w-full bg-white p-2 mt-2 ">
              <h2
                className="font-semibold capitalize ml-2
        "
              >
                Appointments
              </h2>

            <div className="flex space-x-2">
              {[
                { id: 0, label: 'all' },
                { id: 1, label: 'weekly' },
                { id: 2, label: 'monthly' }
              ].map((item, idx) => (
                <Button
                  key={item.id}
                  size={'sm'}
                  className={`rounded-full border bg-transparent text-black hover:bg-slate-100 ${
                    item.label === value && 'bg-slate-200'
                  } `}
                  onClick={() => handleSelectChange(item.label.toLowerCase())}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2 bg-slate-50 p-2">
            <AppointmentBarChart data={weeklyData ?? []} />
            <AppointmentPieChart data={weeklyData ?? []} />

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
                data={importantPatientAppointment ?? []}
                columns={pinnedColumns}
              />
            )}

            {/*  */}
            {tab === 2 && (
              <CustomTable
                isSearch={false}
                data={priorityAppointmentData || []}
                columns={pinnedColumns}
              />
            )}
          {/* </div> */}
        </div>

    </>
  )
}

export default NotifyPage
