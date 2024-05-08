/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import SidebarListItemsComponent, { type SidebarListItemsProps } from '@/app/_components/patient/SidebarListItemsComponent'
import Avatar from '@/components/Avatar'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { BookCheckIcon, BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const DL: SidebarListItemsProps[] = [
    {
      id: '1',
      label: 'Appointments',
      link: '/users/patients/tab/appointments',
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '2',
      label: 'Caregivers',
      link: '/users/patients/tab/caregivers',
      icon: <HeartHandshake size={17} />
    },
    {
      id: '3',
      label: 'Case Managers',
      link: '/users/patients/tab/casemanagers',
      icon: <InspectionPanel size={17} />
    },
    {
      id: '4',
      label: 'Home Visits',
      link: '/users/patients/tab/homevisit',
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
      link: 'viratrack/reports',
      icon: <BookCopy size={17} />
    },
    {
      id: '8',
      label: 'Messages',
      link: 'viratrack/reports',
      icon: <BookCopy size={17} />
    },
    {
      id: '9',
      label: 'Insights',
      link: 'viratrack/reports',
      icon: <BookCopy size={17} />
    },
    {
      id: '10',
      label: 'Settings',
      link: 'viratrack/reports',
      icon: <BookCopy size={17} />
    }
  ]
  return (
      <div className="flex flex-row">
        <Sidebar
        isSearchable={false}
        >
          <Avatar
          name='Joram Bramuel'
          />
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
