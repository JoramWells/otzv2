'use client'

import '../globals.css'

// import { Providers } from '../providers'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../_components/dashboard/Sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BookCheckIcon, BookCopy, HeartHandshake, LayoutDashboardIcon, Users } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/patients/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Caregivers',
    link: '/patients/caregiver',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Patients',
    link: '/patients/patients',
    icon: <Users size={17} />
  },
  {
    id: '4',
    label: 'Enrollment',
    link: 'patients/enrollment',
    icon: <BookCheckIcon size={17} />
  },
  {
    id: '5',
    label: 'Reports',
    link: 'viratrack/reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <SidebarProvider>
          <div className="flex flex-row">
            <Sidebar>
              <SidebarListItemsComponent
              dataList={DL}
              />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <Navbar />

              {children}
            </div>
          </div>
        </SidebarProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default PatientLayout
