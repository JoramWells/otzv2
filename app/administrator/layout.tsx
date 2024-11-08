'use client'
import '../globals.css'
import { Sidebar } from '../../components/sidebar/Sidebar'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { NotificationProvider } from '@/context/NotificationContext'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BellPlus, Calendar, Hospital, LayoutDashboardIcon, Map, Pill, Users, Warehouse } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/administrator/dashboard',
    icon: <LayoutDashboardIcon size={15} />
  },
  {
    id: '2',
    label: 'Appointment',
    link: '/administrator/appointment',
    icon: <Calendar size={15} />
  },
  {
    id: '3',
    label: 'Drugs',
    link: '/administrator/art',
    icon: <Pill size={15} />
  },
  {
    id: '5',
    label: 'home Visit',
    link: '/administrator/home-visit',
    icon: <Warehouse size={15} />
  },
  {
    id: '6',
    label: 'Schools',
    link: '/administrator/schools',
    icon: <Warehouse size={15} />
  },
  {
    id: '7',
    label: 'Location',
    link: '/administrator/location',
    icon: <Map size={15} />
  },
  {
    id: '9',
    label: 'Notifications',
    link: '/administrator/notifications',
    icon: <BellPlus size={15} />
  },
  {
    id: '10',
    label: 'Users',
    link: '/administrator/users',
    icon: <Users size={15} />
  },
  {
    id: '11',
    label: 'Occupation',
    link: '/administrator/occupations',
    icon: <Users size={15} />
  },
  {
    id: '12',
    label: 'Facilities',
    link: '/administrator/facilities',
    icon: <Hospital size={15} />
  },
  {
    id: '13',
    label: 'App Modules',
    link: '/administrator/app-modules',
    icon: <Hospital size={15} />
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
    <AuthenticateLoader/>
  )
}

export default DashboardLayout
