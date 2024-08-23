'use client'
import '../globals.css'
import { Sidebar } from '../../components/sidebar/Sidebar'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { NotificationProvider } from '@/context/NotificationContext'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { Database, LayoutDashboardIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/etl/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '12',
    label: 'Databases',
    link: '/etl',
    icon: <Database size={17} />
  }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
      <SidebarProvider>
        <NotificationProvider>
          <div className="flex flex-row">
            <Sidebar>
              <SidebarListItemsComponent dataList={DL} />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50">
              {/* <Navbar /> */}

              {children}
            </div>
          </div>
        </NotificationProvider>
      </SidebarProvider>
    </Provider>
    )
  }
  return (
      <div>
        <p>Redirecting...</p>
      </div>
  )
}

export default DashboardLayout
