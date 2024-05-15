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
import { LayoutDashboardIcon, Thermometer, WatchIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/enrollment/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'OTZ',
    link: '/enrollment/otz',
    icon: <WatchIcon size={17} />
  },
  {
    id: '3',
    label: 'OVC',
    link: '/enrollment/ovc',
    icon: <Thermometer size={17} />
  },
  {
    id: '4',
    label: 'PAMA',
    link: '/enrollment/pama',
    icon: <Thermometer size={17} />
  },
  {
    id: '5',
    label: 'PMTCT',
    link: '/enrollment/pmtct',
    icon: <Thermometer size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params
  console.log(patientID)

  const pathname = usePathname()
  if (
    pathname === `/patients/tab/dashboard/${patientID}` ||
    pathname === `/patients/tab/appointments/${patientID}` ||
    pathname === `/patients/tab/caregivers/${patientID}` ||
    pathname === `/patients/tab/casemanagers/${patientID}` ||
    pathname === `/patients/tab/homevisit/${patientID}` ||
    pathname === `/patients/tab/lab/${patientID}` ||
    pathname === `/patients/tab/pharmacy/${patientID}` ||
    pathname === `/patients/tab/medication/${patientID}` ||
    pathname === `/patients/tab/messages/${patientID}` ||
    pathname === `/patients/tab/settings/${patientID}` ||
    pathname === `/patients/tab/steps/${patientID}`
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
              <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-[#F3FAFF]">
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
