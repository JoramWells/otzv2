'use client'

import '../globals.css'

// import { Providers } from '../providers'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BellDot, BookCopy, CalendarCheck, MessageCircleMore, MessageSquareText, Phone } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: 'notify',
    icon: <CalendarCheck size={17} />
  },
  {
    id: '7',
    label: 'Appointments',
    link: 'notify/appointments',
    icon: <CalendarCheck size={17} />
  },
  {
    id: '2',
    label: 'Chats',
    link: 'notify/chats',
    icon: <MessageCircleMore size={17} />
  },
  {
    id: '3',
    label: 'Messaging',
    link: 'notify/messaging',
    icon: <MessageSquareText size={17} />
  },
  {
    id: '4',
    label: 'Notifications',
    link: 'notify/notifications',
    icon: <BellDot size={17} />
  },
  {
    id: '5',
    label: 'Voice Call',
    link: 'notify/voice-call',
    icon: <Phone size={17} />
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
    </Provider>
  )
}

export default PatientLayout
