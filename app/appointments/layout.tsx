'use client'

import '../globals.css'

// import { Providers } from '../providers'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { AlignJustify, CalendarCheck, CalendarDays, ClockIcon, LayoutGrid, PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import AuthenticateLoader from '@/components/AuthenticateLoader'

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
    link: '/appointments/appointments',
    icon: <CalendarDays size={17} />
  },
  {
    id: '3',
    label: 'Events',
    link: '/appointments/events',
    icon: <AlignJustify size={17} />
  },
  {
    id: '4',
    label: 'Create Appointment',
    link: '/appointments/add-appointment',
    icon: <PlusIcon size={17} />
  },
  {
    id: '5',
    label: 'Availability',
    link: '/appointments/availability',
    icon: <ClockIcon size={17} />
  },
  {
    id: '6',
    label: 'Apps',
    link: '/appointments/apps',
    icon: <LayoutGrid size={17} />
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
      router.push('/login')
    }
  }, [status, router])

  if (session != null) {
    return (
    <Provider store={store}>
      <SidebarProvider>
        <div className="flex flex-row bg-slate-50">
          <Sidebar>
            <SidebarListItemsComponent dataList={DL} />
          </Sidebar>
          <div className="flex flex-col flex-1 h-screen overflow-y-auto relative">
            {children}
            <Footer/>
          </div>
        </div>
      </SidebarProvider>
    </Provider>
    )
  }

  return <AuthenticateLoader/>
}

export default PatientLayout
