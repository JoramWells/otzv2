'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { HeartHandshake, LayoutDashboardIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import Footer from '@/components/Footer'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { useUserContext } from '@/context/UserContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/home-visit/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Eligible',
    link: '/home-visit/eligible',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Home-Visit',
    link: '/home-visit',
    icon: <HeartHandshake size={17} />
  }
]

const HomeVisitLayout = ({ children }: { children: React.ReactNode }) => {
  const moduleParams = useSearchParams()
  const moduleID = moduleParams.get('moduleID')

  const { data: session, status } = useSession()
  const router = useRouter()
  const { setModuleID } = useUserContext()

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
    setModuleID(moduleID)
  }, [status, router, setModuleID, moduleID])
  if (session != null) {
    return (
          <SidebarProvider>
            <div className="flex flex-row bg-slate-50">
              <Sidebar>
                <SidebarListItemsComponent dataList={DL} />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto">
                {/* <Navbar /> */}

                {children}
                <Footer />
              </div>
            </div>
          </SidebarProvider>
    )
  }

  return (<AuthenticateLoader/>)
}

export default function WrappedHomeVisitLayout (props: any) {
  return (
    <Suspense>
        <Provider store={store}>
          <HomeVisitLayout {...props} />
        </Provider>
    </Suspense>
  )
}
