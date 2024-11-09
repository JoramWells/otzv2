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
import { type JSX, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Footer from '@/components/Footer'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { PharmacyProvider } from '@/context/PharmacyContext'
import io from 'socket.io-client'

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
  const moduleParams = useSearchParams()
  const moduleID = moduleParams.get('moduleID')

  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      path: '/api/appointment/socket.io',
      transports: ['websocket'],
      query: {
        moduleID,
        userID: session?.user.id
      }
    })

    newSocket.on('connect', () => {
      console.log('Connected to appointment server!')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [status, router, session?.user.id, moduleID])

  if (session != null) {
    return (
      <Provider store={store}>
        <SidebarProvider>
          <PharmacyProvider>
            <div className="flex flex-row bg-slate-50">
              <Sidebar>
                <SidebarListItemsComponent dataList={DL} />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto relative">
                {children}
                <Footer />
              </div>
            </div>
          </PharmacyProvider>
        </SidebarProvider>
      </Provider>
    )
  }

  return <AuthenticateLoader/>
}

export default function WrappedPatientLayout (props: JSX.IntrinsicAttributes & { children: React.ReactNode }) {
  return (
    <Suspense>
      <PatientLayout {...props} />
    </Suspense>
  )
}
