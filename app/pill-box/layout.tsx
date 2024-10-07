'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import { BellDot, BookCopy, Kanban, LayoutDashboardIcon, Pill } from 'lucide-react'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { PharmacyProvider } from '@/context/PharmacyContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/pill-box/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '5',
    label: 'Issues',
    link: '/pill-box/issues',
    icon: <Kanban size={17} />
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
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (status === 'unauthenticated') {
      // setTimeout(() => { router.push('/login') }, 2000)
      router.push('/login')
    }
  }, [status, router])
  if (session != null) {
    return (
      <Provider store={store}>
        <PharmacyProvider>
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
        </PharmacyProvider>
      </Provider>
    )
  }

  return <AuthenticateLoader/>
}

export default PillLayout
