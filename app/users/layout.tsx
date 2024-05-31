/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'

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
    link: '/users/caregivers',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Case Managers',
    link: '/users/casemanagers',
    icon: <InspectionPanel size={17} />
  },
  {
    id: '4',
    label: 'Patients',
    link: '/users/patients',
    icon: <Users size={17} />
  },
  {
    id: '6',
    label: 'Reports',
    link: 'viratrack/reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const pathname = usePathname()
  if (
    pathname === `/users/patients/tab/dashboard/${patientID}` ||
    pathname === `/users/patients/tab/appointments/${patientID}` ||
    pathname === `/users/patients/tab/caregivers/${patientID}` ||
    pathname === `/users/patients/tab/casemanagers/${patientID}` ||
    pathname === `/users/patients/tab/homevisit/${patientID}` ||
    pathname === `/users/patients/tab/lab/${patientID}` ||
    pathname === `/users/patients/tab/pharmacy/${patientID}` ||
    pathname === `/users/patients/tab/medication/${patientID}` ||
    pathname === `/users/patients/tab/messages/${patientID}` ||
    pathname === `/users/patients/tab/settings/${patientID}` ||
    pathname === `/users/patients/tab/visits/${patientID}` ||
    pathname === `/users/patients/tab/steps/${patientID}`
  ) {
    return (
      <Provider store={store}>
        <SidebarProvider>{children}</SidebarProvider>
      </Provider>
    )
  }

  return (
      <Provider store={store}>
        <ChakraProvider>
          <SidebarProvider>
            <div className="flex flex-row">
              <Sidebar>
                <SidebarListItemsComponent dataList={DL} />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50">
                {/* <Navbar /> */}

                {children}
              </div>
            </div>
          </SidebarProvider>
        </ChakraProvider>
      </Provider>
  )
}

export default PatientLayout
