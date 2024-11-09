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
import { useRouter, useSearchParams } from 'next/navigation'
import { type JSX, Suspense, useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { PharmacyProvider } from '@/context/PharmacyContext'
import { UserProvider, useUserContext } from '@/context/UserContext'

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
    id: '6',
    label: 'Reports',
    link: '/pill-box/reports',
    icon: <BookCopy size={17} />
  }
]

const PillLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setModuleID } = useUserContext()

  const moduleParams = useSearchParams()
  const moduleID = moduleParams.get('moduleID')

  useEffect(() => {
    setModuleID(moduleID)
  }, [moduleID, setModuleID])
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
    )
  }

  return <AuthenticateLoader/>
}

export default function WrappedPillLayout (props: JSX.IntrinsicAttributes & { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Provider store={store} >
        <UserProvider>
          <PillLayout {...props} />
        </UserProvider>
      </Provider>
    </Suspense>
  )
}
