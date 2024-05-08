/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '@/app/_components/patient/SidebarListItemsComponent'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { type AvatarProps } from '@/types'
import { generateRandomColors } from '@/utils/generateRandomColors'
import { BookCheckIcon, BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useMemo, type ReactNode } from 'react'

const Avatar = ({ name }: AvatarProps) => {
  const fullName = name.split(' ')
  const firstName = fullName[0].charAt(0)
  const secondName = fullName[0].charAt(0)
  const randomColors = useMemo(() => generateRandomColors(), [])
  return (
    <div
      className={`font-bold rounded-full h-12 w-12 text-lg
    flex flex-row items-center justify-center text-white
    `}
      style={{
        backgroundColor: randomColors
      }}
    >
      {firstName}
      {secondName}
    </div>
  )
}

const Layout = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const { data } = useGetPatientQuery(patientID)

  console.log(data, 'dtx')

  const DL: SidebarListItemsProps[] = [
    {
      id: '1',
      label: 'Appointments',
      link: `/users/patients/tab/appointments/${patientID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '2',
      label: 'Caregivers',
      link: `/users/patients/tab/caregivers/${patientID}`,
      icon: <HeartHandshake size={17} />
    },
    {
      id: '3',
      label: 'Case Managers',
      link: `/users/patients/tab/casemanagers/${patientID}`,
      icon: <InspectionPanel size={17} />
    },
    {
      id: '4',
      label: 'Home Visits',
      link: `/users/patients/tab/homevisit/${patientID}`,
      icon: <Users size={17} />
    },
    {
      id: '5',
      label: 'Lab',
      link: '/users/patients/tab/lab',
      icon: <BookCheckIcon size={17} />
    },
    {
      id: '6',
      label: 'Pharmacy',
      link: '/users/patients/tab/pharmacy',
      icon: <BookCopy size={17} />
    },
    {
      id: '7',
      label: 'Medical File',
      link: '/users/patients/tab/medication',
      icon: <BookCopy size={17} />
    },
    {
      id: '8',
      label: 'Messages',
      link: '/users/patients/tab/Messages',
      icon: <BookCopy size={17} />
    },
    {
      id: '9',
      label: 'Insights',
      link: '/users/patients/tab/Insights',
      icon: <BookCopy size={17} />
    },
    {
      id: '10',
      label: 'Settings',
      link: '/users/patients/tab/settings',
      icon: <BookCopy size={17} />
    }
  ]
  return (
    <div className="flex flex-row">
      <Sidebar isSearchable={false}>
        <div className="flex flex-col items-center h-[180px] w-full p-2">
          {data && (
            <div className='flex flex-col items-center  w-full rounded-lg space-y-1' >
              <Avatar name={`${data?.firstName} ${data?.middleName}`}

              />
              <p className='font-bold'>
                {data?.firstName} {data?.middleName}{' '}
              </p>
              {/*  */}
              <p className='text-slate-500 font-bold text-sm'>{data?.initialRegimen} </p>

              <p className='text-sm text-slate-500'>{data?.cccNo} </p>
              <div className='text-slate-500 text-sm'>
                Phone No:
                <p>{data?.phoneNo} </p>
              </div>
            </div>
          )}
        </div>

        <SidebarListItemsComponent dataList={DL} />
      </Sidebar>
      <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50">
        {/* <Navbar /> */}

        {children}
      </div>
    </div>
  )
}

export default Layout
