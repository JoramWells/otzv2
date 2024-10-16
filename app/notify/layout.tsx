'use client'

import '../globals.css'

// import { Providers } from '../providers'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BellDot, BookCopy, CalendarCheck, MessageCircleMore, Phone } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ChatContextProvider } from '@/context/ChatContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/notify/dashboard',
    icon: <CalendarCheck size={17} />
  },
  {
    id: '2',
    label: 'Chats',
    link: '/notify/chats',
    icon: <MessageCircleMore size={17} />
  },
  {
    id: '4',
    label: 'Notifications',
    link: '/notify/notifications',
    icon: <BellDot size={17} />
  },
  {
    id: '5',
    label: 'Voice Call',
    link: '/notify/voice-call',
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
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (status === 'unauthenticated') {
    // setTimeout(() => {
    //   router.push('/login')
    // }, 2000)
      router.push('/login')
    }
  }, [status, router])
  if (session != null) {
    return (
      <Provider store={store}>
        <ChatContextProvider>
          <SidebarProvider>
            <div className="flex flex-row bg-slate-50">
              <Sidebar>
                <SidebarListItemsComponent dataList={DL} />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto">
                {children}
              </div>
            </div>
          </SidebarProvider>
        </ChatContextProvider>
      </Provider>
    )
  }
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}

export default PatientLayout
