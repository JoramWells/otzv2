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
    link: '/clinician/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Patient Queue',
    link: '/clinician/patient-queue',
    icon: <WatchIcon size={17} />
  },
  {
    id: '4',
    label: 'Triage',
    link: '/clinician/triage',
    icon: <Thermometer size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params
  console.log(patientID)

  const pathname = usePathname()
  if (
    pathname === `/clinician/tab/dashboard/${patientID}` ||
    pathname === `/clinician/tab/appointments/${patientID}` ||
    pathname === `/clinician/tab/caregivers/${patientID}` ||
    pathname === `/clinician/tab/casemanagers/${patientID}` ||
    pathname === `/clinician/tab/homevisit/${patientID}` ||
    pathname === `/clinician/tab/lab/${patientID}` ||
    pathname === `/clinician/tab/pharmacy/${patientID}` ||
    pathname === `/clinician/tab/medication/${patientID}` ||
    pathname === `/clinician/tab/messages/${patientID}` ||
    pathname === `/clinician/tab/settings/${patientID}` ||
    pathname === `/clinician/tab/steps/${patientID}`
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
