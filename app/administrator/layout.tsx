'use client'
import '../globals.css'
import { Sidebar } from '../../components/sidebar/Sidebar'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { NotificationProvider } from '@/context/NotificationContext'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BellPlus, Calendar, LayoutDashboardIcon, Map, Pill, Users, Warehouse } from 'lucide-react'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: 'dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Appointment',
    link: '/administrator/appointment',
    icon: <Calendar size={17} />
  },
  {
    id: '3',
    label: 'Drugs',
    link: 'administrator/art',
    icon: <Pill size={17} />
  },
  {
    id: '4',
    label: 'Facilities',
    link: 'administrator/facilities',
    icon: <Warehouse size={17} />
  },
  {
    id: '5',
    label: 'home Visit',
    link: 'administrator/home-visit',
    icon: <Warehouse size={17} />
  },
  {
    id: '6',
    label: 'Lab',
    link: 'administrator/lab',
    icon: <Warehouse size={17} />
  },
  {
    id: '7',
    label: 'Lab',
    link: 'administrator/location',
    icon: <Map size={17} />
  },
  {
    id: '8',
    label: 'Matrons',
    link: 'administrator/matrons',
    icon: <Users size={17} />
  },
  {
    id: '9',
    label: 'Notifications',
    link: 'administrator/notifications',
    icon: <BellPlus size={17} />
  },
  {
    id: '10',
    label: 'Users',
    link: 'administrator/users',
    icon: <Users size={17} />
  },
  {
    id: '11',
    label: 'Occupation',
    link: 'administrator/occupation',
    icon: <Users size={17} />
  }
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <NotificationProvider>
          <div className="flex flex-row">
            <Sidebar>
              <SidebarListItemsComponent dataList={DL} />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              {/* <Navbar /> */}

              {children}
            </div>
          </div>
        </NotificationProvider>
      </SidebarProvider>
    </Provider>
  )
}

export default DashboardLayout
