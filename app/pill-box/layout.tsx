'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import { BellDot, BookCopy, LayoutDashboardIcon, Pill } from 'lucide-react'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/pill-box/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Prescription',
    link: '/pill-box/prescription',
    icon: <Pill size={17} />
  },
  {
    id: '3',
    label: 'Reminder',
    link: '/pill-box/reminder',
    icon: <BellDot size={17} />
  },
  {
    id: '4',
    label: 'Treatment Failure',
    link: '/pill-box/treatment-failure',
    icon: <BookCopy size={17} />
  }
]

const PillLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default PillLayout
