'use client'

import '../globals.css'

// import { Providers } from '../providers'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BookCheckIcon, BookCopy, LayoutDashboardIcon, MessageSquareText } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'homevisit',
    link: 'patients',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Registered Patients',
    link: 'patients/registered-patients',
    icon: <MessageSquareText size={17} />
  },
  {
    id: '3',
    label: 'Enrollment',
    link: 'patients/enrollment',
    icon: <BookCheckIcon size={17} />,
    itemList: [
      {
        id: '1',
        link: '/patients/enrollment/otz',
        label: 'OTZ'
      },
      {
        id: '2',
        link: '/add-home-visit',
        label: 'OVC'
      }
    ]
  },
  {
    id: '4',
    label: 'Reports',
    link: 'viratrack/reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
        <SidebarProvider>
          <div className="flex flex-row">
            <Sidebar>
              <SidebarListItemsComponent dataList={DL} />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <Navbar />

              {children}
            </div>
          </div>
        </SidebarProvider>
    </Provider>
  )
}

export default PatientLayout
