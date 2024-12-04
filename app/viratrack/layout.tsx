'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { LayoutDashboardIcon, Pill } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { UserProvider, useUserContext } from '@/context/UserContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/viratrack/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Vira Track',
    link: '/viratrack/viratrack',
    icon: <Pill size={17} />
  }
  // {
  //   id: '3',
  //   label: 'Reminder',
  //   link: 'pill-box/reminder?tab=all',
  //   icon: <BellDot size={17} />
  // },
  // {
  //   id: '4',
  //   label: 'Reports',
  //   link: 'viratrack/reports',
  //   icon: <BookCopy size={17} />
  // }
]

const ViratrackLayout = ({ children }: { children: React.ReactNode }) => {
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
    // setTimeout(() => {
    //   router.push('/login')
    // }, 2000)
      router.push('/login')
    }
  }, [status, router])
  if (session != null) {
    return (
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
    )
  }
  return <AuthenticateLoader />
}

export default function WrappedViratrackLayout (props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <UserProvider>
            <ViratrackLayout {...props} />
        </UserProvider>
      </Provider>
    </Suspense>
  )
}
