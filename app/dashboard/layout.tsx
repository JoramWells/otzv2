'use client'
import '../globals.css'
import { Sidebar } from '../_components/dashboard/Sidebar'
import SidebarItems from '../_components/dashboard/SidebarItems'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { ChakraProvider } from '@chakra-ui/react'
import { NotificationProvider } from '@/context/NotificationContext'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ChakraProvider>
          <div className="h-screen">
            <Navbar />
            <Sidebar>
              <SidebarItems />
            </Sidebar>

            {children}
          </div>
        </ChakraProvider>
      </NotificationProvider>
    </Provider>
  )
}

export default DashboardLayout
