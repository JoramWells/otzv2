'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BookCopy, HeartHandshake, LayoutDashboardIcon } from 'lucide-react'
import { ChakraProvider } from '@chakra-ui/react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/lab/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Lab Visits',
    link: '/lab/lab-visits',
    icon: <HeartHandshake size={17} />
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
          <div className="flex flex-row bg-slate-50">
            <Sidebar>
              <SidebarListItemsComponent dataList={DL} />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
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
