'use client'

import '../globals.css'

// import { Providers } from '../providers'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BellDot, BookCopy, CalendarCheck, MessageCircleMore } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/appointments/dashboard',
    icon: <CalendarCheck size={17} />
  },
  {
    id: '2',
    label: 'Appointments',
    link: '/appointments/appointments?tab=all',
    icon: <MessageCircleMore size={17} />
  },
  {
    id: '4',
    label: 'Create Appointment',
    link: '/appointments/add-appointment',
    icon: <BellDot size={17} />
  },
  // {
  //   id: '5',
  //   label: 'Voice Call',
  //   link: '/notify/voice-call',
  //   icon: <Phone size={17} />
  // },
  {
    id: '6',
    label: 'Reports',
    link: '',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
        <SidebarProvider>
          <div className="flex flex-row bg-slate-50">
            <Sidebar>
              <SidebarListItemsComponent
              dataList={DL}
              />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">

              {children}
            </div>
          </div>
        </SidebarProvider>
    </Provider>
  )
}

export default PatientLayout
