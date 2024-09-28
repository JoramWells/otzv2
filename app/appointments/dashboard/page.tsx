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
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
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

const NotifyPage = () => {
  const [value, setValue] = useState('weekly')

  const { data: weeklyData } = useGetAllAppointmentsQuery({
    date: '2022-01-01',
    mode: value
  })

  const { data: priorityAppointmentData } = useGetAllPriorityAppointmentsQuery()

  const handleSelectChange = (val: string) => {
    setValue(val)
  }

  const [tab, setTab] = useState(1)

  const filterWeeklyData = useCallback(() => {
    const tempData = weeklyData ? [...weeklyData] : []
    return tempData.filter(
      (item) => item?.Patient?.isImportant
    )
  }, [weeklyData])()

  console.log(weeklyData, 'week')

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="w-full">
        <div className=" bg-white p-4 ">
          <div className="flex justify-between w-full ">
            <div>
              <h1
                className="font-semibold text-lg capitalize
        "
              >
                Appointments
              </h1>

            </div>

            <div className="flex space-x-2">
              {[
                { id: 0, label: 'all' },
                { id: 1, label: 'weekly' },
                { id: 2, label: 'monthly' }
              ].map((item, idx) => (
                <Button
                  key={item.id}
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
            <AppointmentBarChart data={weeklyData} />
            <AppointmentPieChart data={weeklyData} />

          </div>
        </div>
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
          <div className="p-2">
            {tab === 1 && (
              <CustomTable
                isSearch={false}
                data={filterWeeklyData || []}
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
          </div>
        </div>
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
