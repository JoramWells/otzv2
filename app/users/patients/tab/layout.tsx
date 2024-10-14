/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import SidebarListItemsComponent, { type SidebarListItemsProps } from '@/app/_components/patient/SidebarListItemsComponent'
// import Footer from '@/components/Footer'
// import Footer from '@/components/Footer'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { store } from '@/lib/store'
import { ChakraProvider } from '@chakra-ui/react'
import { BookCopy, CalendarDays, History, Home, LayoutDashboardIcon, MessageSquare, Settings } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'

const Layout = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const pathname = usePathname()

  const DL: SidebarListItemsProps[] = [
    {
      id: '1',
      label: 'Dashboard',
      link: `/users/patients/tab/dashboard/${patientID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '2',
      label: 'Appointments',
      link: `/users/patients/tab/appointments/${patientID}`,
      icon: <CalendarDays size={17} />
    },
    {
      id: '5',
      label: 'Home Visits',
      link: `/users/patients/tab/homevisit/${patientID}`,
      icon: <Home size={17} />
    },
    {
      id: '8',
      label: 'Medication',
      link: `/users/patients/tab/medication/${patientID}`,
      icon: <BookCopy size={17} />
    },
    {
      id: '9',
      label: 'Messages',
      link: `/users/patients/tab/messages/${patientID}`,
      icon: <MessageSquare size={17} />
    },
    {
      id: '10',
      label: 'Settings',
      link: `/users/patients/tab/settings/${patientID}`,
      icon: <Settings size={17} />
    },
    {
      id: '11',
      label: 'Visits',
      link: `/users/patients/tab/visits/${patientID}`,
      icon: <History size={17} />
    }
  ]

  if (
    pathname === `/users/patients/tab/steps/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/mmas/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/time-schedule/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/triage/${patientID}`
  ) {
    return (
      <Provider store={store}>
        <ChakraProvider>
          <div className={'bg-slate-50 min-h-screen flex-1'}>
            {children}
            <Toaster />
          </div>
        </ChakraProvider>
      </Provider>
    )
  }

  return (
    <ChakraProvider>
      <div className="flex flex-row">
        <Sidebar isSearchable={false}>
          <SidebarListItemsComponent dataList={DL} />
        </Sidebar>
        <div className={' flex-1 h-screen overflow-y-auto  bg-slate-50'}>
          {/* <Navbar /> */}

          {children}
          <Toaster />
        </div>
        {/* <Footer /> */}
      </div>
    </ChakraProvider>
  )
}

export default Layout
