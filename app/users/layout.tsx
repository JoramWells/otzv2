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
import { BookCheckIcon, BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/users/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Caregivers',
    link: '/users/caregiver',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Case Managers',
    link: '/users/casemanager',
    icon: <InspectionPanel size={17} />
  },
  {
    id: '4',
    label: 'Patients',
    link: '/users/patients',
    icon: <Users size={17} />
  },
  {
    id: '5',
    label: 'Enrollments',
    link: 'users/enrollment',
    icon: <BookCheckIcon size={17} />
  },
  {
    id: '6',
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